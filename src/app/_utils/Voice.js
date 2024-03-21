const sleep = (waitTime) =>
  new Promise((resolve) => setTimeout(resolve, waitTime));

export const appendVoices = () => {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  let defaultVoice = "";
  const japaneseVoices = [];
  voices.forEach((voice) => {
    if (!voice.lang.match("ja")) return;
    if (!voice.default) {
      japaneseVoices.push(voice.name);
    } else {
      defaultVoice = voice.name;
    }
  });
  if (defaultVoice) {
    return [defaultVoice, ...japaneseVoices];
  }
  return japaneseVoices;
};

export const playVoice = async (voiceSelect, messageBody, toName) => {
  const synth = window.speechSynthesis;

  let message = messageBody.replace(/\r?\n/g, "。");
  message = messageBody.replace(/\s/g, "、");

  if (toName) {
    const utterThis = new SpeechSynthesisUtterance(toName);
    utterThis.rate = 0.9;
    utterThis.pitch = 0.9;
    utterThis.voice = synth
      .getVoices()
      .filter((voice) => voice.name === voiceSelect)[0];
    synth.speak(utterThis);
    await sleep(1300);
  }

  const paragraphs = message.split("。");
  for (let i = 0; i < paragraphs.length; i++) {
    if (i !== 0) {
      await sleep(1300);
    }
    const clauses = paragraphs[i].split("、");
    for (let j = 0; j < clauses.length; j++) {
      if (j !== 0) {
        await sleep(800);
      }
      const utterThis = new SpeechSynthesisUtterance(clauses[j]);
      utterThis.rate = 0.9;
      utterThis.pitch = 0.9;
      utterThis.voice = synth
        .getVoices()
        .filter((voice) => voice.name === voiceSelect)[0];
      synth.speak(utterThis);
    }
  }
};
