# 🧠 Critical Thinking Dialogue System

A modular and research-driven dialogue system designed to enhance **critical thinking skills** through AI-powered, Socratic-style conversations. Developed as part of a pedagogical initiative at the **University of Tehran**, this system was presented at the **International Conference on Web Research (ICWR) 2025**.

---

## 🎯 Project Overview

This system simulates structured, interactive dialogues in **Persian (Farsi)**, aiming to strengthen the user’s reasoning skills across multiple dimensions of critical thinking. Each dialogue is powered by a dedicated system prompt that corresponds to a specific **reasoning pattern or fallacy detection mode**.

### 🔍 Reasoning Modules Included

- **Socratic Dialectic Master** – Final boss mode with adversarial yet fair dialogue
- **Deductive Reasoning** – Validity-based logic from general to specific
- **Inductive Reasoning** – Generalization from observations and examples
- **Abductive Reasoning** – Choosing the best possible explanation
- **Analogical Reasoning** – Drawing insights through structured similarity
- **Burden of Proof** – Assigning justification responsibility
- **Confirmation Bias Detection** – Challenging biased information processing
- **Ad Hominem Fallacy** – Redirecting focus from person to argument
- **Conditional Reasoning** – Evaluating if-then statements and logical forms
- **Dialectical Induction** – Synthesizing generalizations through structured debate
- **Teaching through Analogy** – Constructing and critiquing metaphors in learning
- **Criticizing Ideas, Not People** – Modeling respectful intellectual disagreement

---

## 📽️ Workshop Presentation

The project was presented at the **ICWR2025 workshop** under the theme  
**"Minds and Machines: Critical Thinking and Instructional Design in the Age of AI"**.

🎞️ [Presentation Slides on SlideShare](https://www.slideshare.net/slideshow/ss-8674/278049125)

🔗 Explore workshop resources and interactive content:  
https://icwr2025.telab.ir/

📦 GitHub Repository of Prompts & Models:  
https://github.com/MohsenMahmoudi/CTF

---

## ✨ Features

- Multiple AI personas simulating Socratic, pedagogical, and dialectical reasoning
- Designed for **educators**, **researchers**, and **advanced learners**
- Modular architecture with scalable reasoning endpoints
- Includes **system prompts**, use-case templates, and frontend interface
- Ideal for critical thinking training in **higher education**, **EdTech apps**, or **AI ethics bootcamps**

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MohsenMahmoudi/CTF.git
cd CTF
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Create a `.env` file

Duplicate `.env.example` and configure environment variables.

### 4. Start the backend server

```bash
npm start
```

### 5. Serve the frontend (in a new terminal)

```bash
cd frontend
npx serve -s build
```

---

## ⚙️ Environment Variables

See `.env.example` for required environment variables, including:

- `API_KEY`: Your OpenAI / local inference API key  
- `MODEL_ENDPOINT`: Path to model routing logic (e.g., gpt-4o-mini, gpto1)  
- `LANGUAGE`: Default language code (`fa` for Persian)

---

## 🤝 How to Contribute

We welcome contributions and collaborations from:

- **Educators**: Suggest prompts and classroom applications  
- **Researchers**: Collaborate on LLM-based pedagogical frameworks  
- **Developers**: Help improve modularity, UI, and backend integration  

Feel free to fork the repo, create issues, or contact the maintainer directly.

---

## 📬 Contact

👤 **Project Lead**: Mohsen Mahmoudi  
🔗 [LinkedIn](https://www.linkedin.com/in/mohsenadc/)  
🏛️ [TELAB (Tech-Enhanced Lab)](https://telab.ir), University of Tehran

---

## 📜 License

MIT License. See the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- [International Conference on Web Research (ICWR) 2025](https://icwr2025.telab.ir/)
- [TELAB – Tech-Enhanced Learning and AI Lab, University of Tehran](https://telab.ir)
- All workshop participants and early testers of the dialogue modules.

---

> “The unexamined prompt is not worth deploying.”  
> — Dark Socrates 🧠💥

```