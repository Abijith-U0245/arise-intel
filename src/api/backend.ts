export async function sendRiskPrediction(studentId: string, riskScore: number) {
  const response = await fetch("http://localhost:4000/predict-risk", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      studentId,
      riskScore
    })
  });

  const data = await response.json();
  return data;
}

export async function getBlockchain() {
  const res = await fetch("http://localhost:4000/chain");
  const data = await res.json();
  return data;
}