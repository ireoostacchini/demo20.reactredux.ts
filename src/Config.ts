
//TODO: env vars?

//https://github.com/dotnet/aspnetcore/issues/13048
//ssl port 44331 - ssl local certs don't work (easily) on linux
const dev = {
  apiBaseUrl: "http://localhost:50263/api",
};

const prod = {
  apiBaseUrl: "https://prod/api",
};

const getSettings = () => {
  if (process.env.NODE_ENV === "development") {
    return dev;
  } else {
    return prod;
  }
};

export default {
  settings: getSettings(),
};
