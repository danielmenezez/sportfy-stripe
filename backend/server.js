import express from "express"
import cors from "cors"
import "dotenv/config"
import Stripe from "stripe"
import { MercadoPagoConfig, Preference, Payment } from "mercadopago"

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

// ─── Clientes de pagamento ────────────────────────────────────────────────────
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null

const mpClient = process.env.MERCADO_PAGO_ACCESS_TOKEN
  ? new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN })
  : null

const provider = (process.env.PAYMENT_PROVIDER || "stripe").toLowerCase()

app.get("/", (req, res) => {
  res.json({
    message: "Backend SportFY rodando com sucesso",
    provider,
    allowedOrigins
  })
})

// ─── Checkout unificado ───────────────────────────────────────────────────────
app.post("/api/create-checkout", async (req, res) => {
  const { cart, customer } = req.body

  if (!cart || cart.length === 0) {
    return res.status(400).json({ error: "Carrinho vazio" })
  }

  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173"

  // ── Stripe ──
  if (provider === "stripe") {
    if (!stripe) return res.status(500).json({ error: "STRIPE_SECRET_KEY não configurada." })

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card", "boleto", "pix"],
        line_items: cart.map((item) => ({
          price_data: {
            currency: "brl",
            product_data: { name: item.name },
            unit_amount: Math.round(Number(item.price) * 100)
          },
          quantity: Number(item.quantity)
        })),
        mode: "payment",
        customer_email: customer?.email || undefined,
        success_url: `${frontendUrl}/pagamento/sucesso?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${frontendUrl}/pagamento/falha`,
        locale: "pt-BR",
        metadata: { external_reference: `SPORTFY-${Date.now()}` }
      })

      return res.json({ url: session.url, id: session.id, provider: "stripe" })
    } catch (error) {
      console.error("Erro Stripe:", error)
      return res.status(500).json({ error: "Erro ao criar sessão de pagamento", details: error.message })
    }
  }

  // ── MercadoPago ──
  if (provider === "mercadopago") {
    if (!mpClient) return res.status(500).json({ error: "MERCADO_PAGO_ACCESS_TOKEN não configurada." })

    try {
      const preference = new Preference(mpClient)
      const backendUrl = process.env.BACKEND_URL
      const isSandbox = process.env.MP_SANDBOX === "true"

      const preferenceBody = {
        items: cart.map((item, index) => ({
          id: String(item.id ?? index + 1),
          title: item.name,
          quantity: Number(item.quantity),
          unit_price: parseFloat(Number(item.price).toFixed(2)),
          currency_id: "BRL"
        })),
        payer: {
          name: customer?.name || "Cliente SportFY",
          email: customer?.email || "cliente@sportfy.com"
        },
        back_urls: {
          success: `${frontendUrl}/pagamento/sucesso`,
          failure: `${frontendUrl}/pagamento/falha`,
          pending: `${frontendUrl}/pagamento/pendente`
        },
        payment_methods: {
          excluded_payment_types: [{ id: "ticket" }],
          installments: 12
        },
        auto_return: "approved",
        statement_descriptor: "SPORTFY",
        external_reference: `SPORTFY-${Date.now()}`
      }

      if (backendUrl && !backendUrl.includes("localhost")) {
        preferenceBody.notification_url = `${backendUrl}/api/webhook`
      }

      const result = await preference.create({ body: preferenceBody })
      const url = isSandbox ? result.sandbox_init_point : result.init_point

      return res.json({ url, id: result.id, provider: "mercadopago" })
    } catch (error) {
      console.error("Erro MercadoPago:", error)
      return res.status(500).json({ error: "Erro ao criar preferência de pagamento", details: error.message })
    }
  }

  return res.status(400).json({ error: `Provedor desconhecido: ${provider}` })
})

// ─── Status do pagamento ──────────────────────────────────────────────────────
app.get("/api/payment-status/:id", async (req, res) => {
  const { id } = req.params

  // Stripe: IDs começam com cs_
  if (id.startsWith("cs_") && stripe) {
    try {
      const session = await stripe.checkout.sessions.retrieve(id)
      return res.json({ status: session.payment_status, id: session.id })
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar sessão Stripe" })
    }
  }

  // MercadoPago: IDs numéricos
  if (mpClient) {
    try {
      const payment = new Payment(mpClient)
      const result = await payment.get({ id })
      return res.json({ status: result.status, id: result.id })
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar pagamento MercadoPago" })
    }
  }

  return res.status(400).json({ error: "Nenhum provedor disponível para verificar status" })
})

app.post("/api/webhook", (req, res) => {
  console.log("Webhook recebido:", req.body)
  res.sendStatus(200)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend rodando na porta ${PORT} | Provedor: ${provider}`)
})
