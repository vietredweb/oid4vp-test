export default function handler(req, res) {
  res.setHeader("Content-Type", "application/oauth-authz-req+json");

  res.status(200).json({
    response_type: "vp_token",
    client_id: "https://oid4vp-test.vercel.app",
    redirect_uri: "https://oid4vp-test.vercel.app/callback", // fake for now
    scope: "openid",
    state: "123456",
    nonce: "abcdef",
    presentation_definition: {
      id: "age-country-check",
      input_descriptors: [
        {
          id: "age_check",
          name: "Age Verification",
          purpose: "You must be 18+",
          schema: [
            {
              uri: "https://schema.org/Person",
            },
          ],
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
          purpose: "Must be from Germany",
          schema: [
            {
              uri: "https://schema.org/Person",
            },
          ],
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
