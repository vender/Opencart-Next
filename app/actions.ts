"use server";

export async function sendQuestion(
  prevState: any, 
  Data: FormData
) {
  
  if(!Data.get("name")?.length || !Data.get("email")?.length || !Data.get("message")?.length){
    return {error: "Заполните все поля!"};
  }

  const formdata = new FormData();
  formdata.append("chat_id", `${process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID}`);
  formdata.append("parse_mode", "HTML");
  formdata.append("text", `Вопрос c сайта: ${Data.get("productName")} \n\n<b>${Data.get("name")}</b> \n<u>${Data.get("email")}</u> \n<i>${Data.get("message")}</i>`);

  const requestOptions:any = {
    method: "POST",
    body: formdata,
    redirect: "follow"
  };

  try {
    const response = await fetch(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage`, requestOptions);
    const result = await response.text();
    return {message: "Сообщение отправлено, спасибо!"};
  } catch (error) {
    console.error(error);
  };
}