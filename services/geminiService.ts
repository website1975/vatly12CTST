import { GoogleGenAI, Type } from "@google/genai";
import { Lesson, QuizQuestion, SimulationData } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const MODEL_TEXT = 'gemini-2.5-flash';

// Helper to check API key
export const checkApiKey = () => {
  if (!apiKey) {
    console.error("API Key is missing. Please set process.env.API_KEY");
    return false;
  }
  return true;
};

// Generate formatted theory content
export const generateLessonTheory = async (lesson: Lesson): Promise<string> => {
  if (!checkApiKey()) return "Lỗi: Chưa cấu hình API Key.";

  const prompt = `
    Bạn là một giáo viên Vật Lý lớp 12 giỏi, chuyên soạn bài giảng theo bộ sách "Chân Trời Sáng Tạo".
    Hãy viết tóm tắt lý thuyết cho **${lesson.title}** thuộc **${lesson.chapter}**.
    
    Yêu cầu:
    1. Trình bày rõ ràng, súc tích bằng Markdown.
    2. Sử dụng các đề mục (##, ###) để phân chia nội dung.
    3. Bao gồm các định nghĩa, công thức quan trọng (dùng LaTeX format dạng $...$ hoặc $$...$$ nếu cần, nhưng ưu tiên text dễ đọc).
    4. Có ví dụ minh hoạ thực tế ngắn gọn.
    5. Giọng văn sư phạm, dễ hiểu cho học sinh.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_TEXT,
      contents: prompt,
    });
    return response.text || "Không thể tạo nội dung bài học.";
  } catch (error) {
    console.error("Generate Theory Error:", error);
    return "Đã xảy ra lỗi khi tải bài học. Vui lòng thử lại.";
  }
};

// Generate Quiz Questions in JSON
export const generateLessonQuiz = async (lesson: Lesson): Promise<QuizQuestion[]> => {
  if (!checkApiKey()) return [];

  const prompt = `Tạo 5 câu hỏi trắc nghiệm khách quan về bài học: "${lesson.title}" (${lesson.chapter}) chương trình Vật Lý 12 Chân Trời Sáng Tạo.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_TEXT,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              correctAnswer: { type: Type.INTEGER, description: "Index of the correct answer (0-3)" },
              explanation: { type: Type.STRING }
            },
            required: ["id", "question", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as QuizQuestion[];
  } catch (error) {
    console.error("Generate Quiz Error:", error);
    return [];
  }
};

// Generate Simulation Description
export const generateSimulationInfo = async (lesson: Lesson): Promise<SimulationData | null> => {
  if (!checkApiKey()) return null;

  const prompt = `
    Đề xuất một kịch bản mô phỏng hoặc thí nghiệm ảo cho bài học: "${lesson.title}".
    Mô tả chi tiết những gì học sinh sẽ thấy và tương tác.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_TEXT,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
             title: { type: Type.STRING },
             description: { type: Type.STRING },
             scenario: { type: Type.STRING, description: "Step by step description of the simulation flow" },
             imageUrl: { type: Type.STRING, description: "A prompt descriptive enough to generate an image of this simulation, but returning a placeholder URL logic handled by client" } 
          }
        }
      }
    });
    
    const data = JSON.parse(response.text || "{}");
    // Since we can't actually generate the image via API here without complexity, 
    // we use a random efficient placeholder but pass the data structure.
    return {
      ...data,
      imageUrl: `https://picsum.photos/800/400?random=${Math.floor(Math.random() * 1000)}`
    };

  } catch (error) {
    console.error("Sim Gen Error", error);
    return null;
  }
}

// Chat functionality
export const sendChatMessage = async (history: {role: string, parts: {text: string}[]}[], newMessage: string, lessonContext: string) => {
  if (!checkApiKey()) return "Lỗi API Key.";

  try {
    const chat = ai.chats.create({
      model: MODEL_TEXT,
      config: {
        systemInstruction: `Bạn là trợ lý ảo chuyên về Vật Lý 12 (Chân Trời Sáng Tạo). 
        Bối cảnh hiện tại là bài học: ${lessonContext}.
        Hãy trả lời ngắn gọn, chính xác, khuyến khích tư duy.`,
      },
      history: history
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;
  } catch (error) {
    console.error("Chat Error", error);
    return "Xin lỗi, tôi đang gặp sự cố kết nối.";
  }
};
