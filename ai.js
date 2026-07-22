// ===============================
// AI 助教
// 全站共用
// ===============================

const workerURL = "https://math-ai.lolhirainy.workers.dev/";

// 取得目前教具資訊
const config = window.aiInfo || {
    module: "未知教具",
    grade: "未知年級",
    description: ""
};

// 找到聊天元件
const sendBtn = document.getElementById("sendBtn");
const question = document.getElementById("question");
const chat = document.getElementById("chat");

// 如果頁面沒有 AI 視窗就不要執行
if (sendBtn && question && chat) {

    sendBtn.onclick = async function () {

        const text = question.value.trim();

        if (text === "") return;

        // 顯示學生訊息
        chat.innerHTML += `
            <p><b>你：</b>${text}</p>
        `;

        // 捲到底
        chat.scrollTop = chat.scrollHeight;

        try {

            const response = await fetch(workerURL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    message: text,

                    module: config.module,

                    grade: config.grade,

                    description: config.description

                })

            });

            const data = await response.json();

            chat.innerHTML += `
                <p><b>AI：</b>${data.reply}</p>
            `;

        } catch (error) {

            chat.innerHTML += `
                <p style="color:red;">
                    <b>AI：</b>目前無法連線
                </p>
            `;

            console.error(error);

        }

        question.value = "";

        chat.scrollTop = chat.scrollHeight;

    };

    // Enter 直接送出
    question.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {

            sendBtn.click();

        }

    });

}