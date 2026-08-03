import request from "supertest";
import express from "express";
import bodyParser from "body-parser";

function createApp() {
  const app = express();
  app.use(express.json({ limit: "5mb" }));
  app.post(
    "/api/stripe/webhook",
    bodyParser.raw({ type: "application/json" }),
    (req, res) => {
      if (!req.body) return res.status(400).json({ error: "no body" });
      res.json({ received: true });
    }
  );
  return app;
}

describe("Stripe webhook raw-body handling", () => {
  const app = createApp();
  it("accepts raw JSON body", async () => {
    const payload = Buffer.from(JSON.stringify({ id: "evt_test", data: "x" }), "utf8");
    const resp = await request(app)
      .post("/api/stripe/webhook")
      .set("Content-Type", "application/json")
      .set("stripe-signature", "t=1,v1=fakesig")
      .send(payload);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({ received: true });
  });
});
