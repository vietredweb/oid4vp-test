export default function handler(req, res) {
  res
    .status(200)
    .setHeader(
      "Content-Type",
      "application/oauth-authz-req+json; charset=UTF-8"
    );

  res.end(
    JSON.stringify({
      response_type: "vp_token",
      client_id: "https://oid4vp-test.vercel.app",
      redirect_uri: "https://oid4vp-test.vercel.app/callback",
      scope: "openid",
      state: "abc123",
      nonce: "xyz789",
      presentation_definition: {
        id: "age-check-18",
        input_descriptors: [
          {
            id: "age-verification",
            name: "Verify age ≥ 18",
            purpose: "Ensure the user is at least 18 years old",
            constraints: {
              fields: [
                {
                  path: [
                    "$.credentialSubject.birthDate",
                    "$.vc.credentialSubject.birthDate",
                  ],
                  filter: {
                    type: "string",
                    format: "date",
                    maximum: "2007-08-01",
                  },
                },
              ],
            },
          },
        ],
      },
    })
  );
}
