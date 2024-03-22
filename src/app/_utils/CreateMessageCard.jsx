import satori from "satori";
import { Canvg } from "canvg";

const IMAGE_WIDTH = 825;
const IMAGE_HEIGHT = 637.5;

const MessageCardTypeInfo = {
  flower: {
    background: "/Cardimage/Flowercard2.png",
  },
  penguin: {
    background: "/Cardimage/Penguincard.png",
  },
  risu: {
    background: "/Cardimage/Risucard.png",
  },
  simple: {
    background: "/Cardimage/Simplecard2.png",
  },
};

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

export const createMessageCard = async (
  messageBody,
  toName,
  messageCardType = "flower"
) => {
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

  const background = MessageCardTypeInfo[messageCardType].background;
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
      {messageCardType === "penguin" ? (
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
          {toName && (
            <div style={{ position: "absolute", top: "312px", left: "258px" }}>
              {toName}
            </div>
          )}

          <div
            style={{
              position: "absolute",
              top: "370px",
              width: IMAGE_WIDTH - 200 + "px",
              height: "200px",
              textAlign: "center",
              wordBreak: "break-all",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {messageBody &&
              messageBody.split(/\r?\n/).map((line) => <div>{line}</div>)}
          </div>
        </div>
      ) : (
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
          {toName &&
            (messageCardType === "flower" || messageCardType === "risu") && (
              <div>{toName}</div>
            )}
          {toName && messageCardType === "simple" && (
            <div style={{ position: "absolute", top: "32px", left: "170px" }}>
              {toName}
            </div>
          )}

          <div
            style={{
              textAlign: "center",
              wordBreak: "break-all",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {messageBody &&
              messageBody.split(/\r?\n/).map((line) => <div>{line}</div>)}
          </div>
        </div>
      )}
      <div
        style={{ position: "absolute", bottom: 20, right: 20, fontSize: 25 }}
      >
        {new Date().toLocaleDateString()}
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
