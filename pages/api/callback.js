export default async function handler(req, res) {
  if (req.method === "GET") {
    const { vp_token, state } = req.query;

    if (!vp_token) {
      return res.status(400).json({ error: "Missing vp_token" });
    }

    // Decode JWT (vp_token) and verify
    const jwtParts = vp_token.split(".");
    const payload = JSON.parse(
      Buffer.from(jwtParts[1], "base64url").toString()
    );

    // Extract VC info
    const vp = payload?.vp;
    const credentials = vp?.verifiableCredential || [];

    let ageOK = false;
    let countryOK = false;

    credentials.forEach((vc) => {
      const birthDate = vc.credentialSubject?.birthDate;
      const country = vc.credentialSubject?.address?.addressCountry;

      if (birthDate) {
        const cutoff = new Date();
        cutoff.setFullYear(cutoff.getFullYear() - 18);
        ageOK = new Date(birthDate) <= cutoff;
      }

      if (country === "DE") {
        countryOK = true;
      }
    });

    res.status(200).json({ verified: ageOK && countryOK, ageOK, countryOK });
  } else {
    res.status(405).end();
  }
}
