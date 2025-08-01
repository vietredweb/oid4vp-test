export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({
    response_type: "vp_token",
    client_id: "https://oid4vp-test.vercel.app",
    redirect_uri: "https://oid4vp-test.vercel.app/api/callback",
    scope: "openid",
    state: "abc123",
    nonce: "xyz456",
    presentation_definition: {
      id: "age-country-check",
      input_descriptors: [
        {
          id: "age_check",
          name: "Age Verification",
          purpose: "We need to verify your age is over 18",
          schema: [{ uri: "https://schema.org/Person" }],
          constraints: {
            fields: [
              {
                path: ["$.birthDate"],
                filter: {
                  type: "string",
                  format: "date",
                  maximum: "2007-08-01",
                },
              },
            ],
          },
        },
        {
          id: "country_check",
          name: "Country Verification",
          purpose: "We need to verify you are from Germany",
          schema: [{ uri: "https://schema.org/Person" }],
          constraints: {
            fields: [
              {
                path: ["$.address.addressCountry"],
                filter: {
                  type: "string",
                  const: "DE",
                },
              },
            ],
          },
        },
      ],
    },
  });
}
