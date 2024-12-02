/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      azure: "#F2FDFF",
      tiffany: "#9ad4d6",
      roselight: "#dbcbd8",
      violet: "#564787",
      grey: "#9FA2B2",
      INUNDACAO: "#04357E",
      QUEIMADA: "#960000",
      ALAGAMENTO: "#0561B6",
      "txt-white": "#e2e8f0",
    },
    fontFamily: {
      padrão: ["Red Hat Display"],
    },
    extend: {
      backgroundImage: {
        "img-INUNDACAO": "url('./src/assets/INUNDACAO.jpg')",
        "img-ALAGAMENTO": "url('./src/assets/ALAGAMENTO.jpg')",
        "img-QUEIMADA": "url('./src/assets/QUEIMADA.jpg')",
      },
    },
  },
  plugins: [],
};
