module.exports = {
  content: ["./App.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
      },
      fontFamily: {
        "roboto-400": ["RobotoRegular"],
        "roboto-500": ["RobotoMedium"],
        "roboto-600": ["RobotoSemiBold"],
        "roboto-700": ["RobotoBold"],
        "roboto-800": ["RobotoExtraBold"],
        "roboto-900": ["RobotoBlack"],
      },
      colors: {
        title_color: "#121212",
        sub_title_color: "#454545",
        lavel_title_color: "#000",
        blue_color: "#003B73",
        button_color: "#003B73",
        bg_primary: "#F9FEFF",
        secondary_button_color: "#696969",
        text_gray: "#696969",
        input_bg_gray: "#ECF1F6",
        text_white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
