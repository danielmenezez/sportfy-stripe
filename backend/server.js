import express from "express"
import cors from "cors"
import "dotenv/config"
import Stripe from "stripe"

const app = express()

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://sportfyfatec.netlify.app",
  process.env.FRONTEND_URL
].filter(Boolean)

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    return callback(new Error(`Origem bloqueada pelo CORS: ${origin}`))
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}

app.use(cors(corsOptions))
app.use(express.json())

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.get("/", (req, res) => {
  res.json({ message: "Backend SportFY rodando com sucesso", allowedOrigins })
})

app.post("/api/create-checkout", async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: "Configuração de pagamento ausente no servidor." })
  }

  try {
    const { cart, customer } = req.body

    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: "Carrinho vazio" })
    }

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173"

    const lineItems = cart.map((item) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: item.name
        },
        unit_amount: Math.round(Number(item.price) * 100)
      },
      quantity: Number(item.quantity)
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "boleto", "pix"],
      line_items: lineItems,
      mode: "payment",
      customer_email: customer?.email || undefined,
      success_url: `${frontendUrl}/pagamento/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/pagamento/falha`,
      locale: "pt-BR",
      metadata: {
        external_reference: `SPORTFY-${Date.now()}`
      }
    })

    return res.json({ url: session.url, id: session.id })
  } catch (error) {
    console.error("Erro Stripe:", error)
    return res.status(500).json({
      error: "Erro ao criar sessão de pagamento",
      details: error.message
    })
  }
})

app.get("/api/payment-status/:id", async (req, res) => {
  const { id } = req.params

  try {
    const session = await stripe.checkout.sessions.retrieve(id)
    return res.json({ status: session.payment_status, id: session.id })
  } catch (error) {
    console.error("Erro ao buscar sessão:", error)
    res.status(500).json({ error: "Erro ao buscar status do pagamento" })
  }
})

app.post("/api/webhook", (req, res) => {
  console.log("Webhook recebido:", req.body)
  res.sendStatus(200)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend rodando na porta ${PORT}`)
})
