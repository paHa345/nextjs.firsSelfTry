const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "uerqlzlole9xj0pi0wbk",
        mongodb_password: "TfXXkUycEhfDe2lkcePT",
        mongodb_database: "bnjpnqkq0agsple",
        NEXTAUTH_URL: "http://localhost:3000",
        SECRET: "paHa345",
      },
    };
  }
  return {
    env: {
      mongodb_username: "uerqlzlole9xj0pi0wbk",
      mongodb_password: "TfXXkUycEhfDe2lkcePT",
      mongodb_database: "bnjpnqkq0agsple",
      NEXTAUTH_URL: "https://nextjs-firs-self-try.vercel.app",
      SECRET: "paHa345",
    },
  };
};
