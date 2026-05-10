import express from "express"
import cors from "cors"
import "dotenv/config"
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

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN
})

const preference = new Preference(client)

app.get("/", (req, res) => {
  res.json({
    message: "Backend SportFY rodando com sucesso",
    allowedOrigins
  })
})

app.post("/api/create-preference", async (req, res) => {
  const { cart, customer } = req.body

  if (!cart || cart.length === 0) {
    return res.status(400).json({ error: "Carrinho vazio" })
  }

  // Modo simulação: redireciona direto para a página de sucesso sem chamar o MP
  if (process.env.MP_SIMULATE === "true") {
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173"
    const fakeId = `SIM-${Date.now()}`
    const successUrl = `${frontendUrl}/pagamento/sucesso?payment_id=${fakeId}&status=approved&external_reference=SPORTFY-${Date.now()}`
    return res.json({ id: fakeId, init_point: successUrl, sandbox_init_point: null })
  }

  if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
    console.error("MERCADO_PAGO_ACCESS_TOKEN não configurado no .env")
    return res.status(500).json({ error: "Configuração de pagamento ausente no servidor." })
  }

  try {

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173"
    const backendUrl = process.env.BACKEND_URL

    const items = cart.map((item, index) => ({
      id: String(item.id ?? index + 1),
      title: item.name,
      quantity: Number(item.quantity),
      unit_price: parseFloat(Number(item.price).toFixed(2)),
      currency_id: "BRL"
    }))

    const preferenceBody = {
      items,
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

    // só inclui notification_url se for uma URL pública (não localhost)
    if (backendUrl && !backendUrl.includes("localhost")) {
      preferenceBody.notification_url = `${backendUrl}/api/webhook`
    }

    const result = await preference.create({ body: preferenceBody })

    const isSandbox = process.env.MP_SANDBOX === "true"

    return res.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: isSandbox ? result.sandbox_init_point : null
    })
  } catch (error) {
    console.error("Erro Mercado Pago:", error)

    return res.status(500).json({
      error: "Erro ao criar preferência de pagamento",
      details: error.message
    })
  }
})

app.get("/api/payment-status/:id", async (req, res) => {
  if (req.params.id.startsWith("SIM-")) {
    return res.json({ id: req.params.id, status: "approved" })
  }

  try {
    const payment = new Payment(client)
    const result = await payment.get({ id: req.params.id })
    res.json(result)
  } catch (error) {
    console.error("Erro ao buscar status do pagamento:", error)
    res.status(500).json({ error: "Erro ao buscar status do pagamento" })
  }
})

app.post("/api/webhook", (req, res) => {
  console.log("Webhook recebido:", req.body)
  // Aqui você pode processar a notificação do MercadoPago
  // Por exemplo, atualizar status do pedido em um banco de dados
  res.sendStatus(200)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend rodando na porta ${PORT}`)
})