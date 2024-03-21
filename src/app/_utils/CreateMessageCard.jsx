import satori from "satori";
import { Canvg } from "canvg";

const IMAGE_WIDTH = 825;
const IMAGE_HEIGHT = 637.5;

const covertPngUrlToBase64 = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
};

const convertSvgToPng = async (svg) => {
  const canvas = document.createElement("canvas");
  canvas.width = IMAGE_WIDTH;
  canvas.height = IMAGE_HEIGHT;
  const ctx = canvas.getContext("2d");
  const v = await Canvg.fromString(ctx, svg).render();

  const imgURI = canvas.toDataURL("image/png");

  return imgURI;
};

export const createMessageCard = async (messageBody, toName) => {
  const endpoint = new URL("https://www.googleapis.com/webfonts/v1/webfonts");
  endpoint.searchParams.set("family", "M PLUS 2");
  endpoint.searchParams.set(
    "key",
    process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY
  );

  const fontInfo = await fetch(endpoint, {
    cache: "no-cache",
  }).then((res) => res.json());

  const fontResponse = await fetch(fontInfo.items[0].files["300"], {
    cache: "no-cache",
  });
  const fontBuffer = await fontResponse.arrayBuffer();

  const background = "/Cardimage/Flowercard2.png";
  const backgroundBase64 = await covertPngUrlToBase64(background);

  const svg = await satori(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        fontSize: 35,
        fontFamily: "M PLUS 2",
        position: "relative",
      }}
    >
      <img
        src={backgroundBase64}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        style={{ objectFit: "contain", opacity: 1 }}
      />
      <div
        style={{
          color: "black",
          position: "absolute",
          top: 0,
          left: 0,
          width: IMAGE_WIDTH,
          height: IMAGE_HEIGHT,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
        }}
      >
        <div>{toName}</div>

        <div style={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
          {messageBody}
        </div>

        <div
          style={{ position: "absolute", bottom: 20, right: 20, fontSize: 25 }}
        >
          {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>,
    // 第一引数に SVG に変換したい要素を渡す
    {
      width: IMAGE_WIDTH, // 幅
      height: IMAGE_HEIGHT, // 高さ
      fonts: [
        {
          name: "M PLUS 2",
          data: fontBuffer, // ここに渡す
        },
      ],
    }
  );
  return await convertSvgToPng(svg);
};
