"use server";

export async function sendQuestion(
  prevState: any, 
  Data: FormData
) {
  
  if(!Data.get("name")?.length || !Data.get("email")?.length || !Data.get("message")?.length){
    return {error: "Заполните все поля!"};
  }

  const formdata = new FormData();
  formdata.append("chat_id", "-1002574773501");
  formdata.append("parse_mode", "HTML");
  formdata.append("text", `Вопрос c сайта: ${Data.get("productName")} \n\n<b>${Data.get("name")}</b> \n<u>${Data.get("email")}</u> \n<i>${Data.get("message")}</i>`);

  const requestOptions:any = {
    method: "POST",
    body: formdata,
    redirect: "follow"
  };

  try {
    const response = await fetch("https://api.telegram.org/bot7658956878:AAH5A6OOW0H2ZuGpNai0O-Yur53vCNKZdlc/sendMessage", requestOptions);
    const result:any = await response.text();
    if (result.error_code) {
      return {error: "Ошибка отправки сообщения, попробуйте позже!"};
    } else {
      return {message: "Сообщение отправлено, спасибо!"};
    }
  } catch (error) {
    console.error(error);
  };
}