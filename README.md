<div align="center">

<img src="https://github.com/user-attachments/assets/18d31df2-44f4-4acb-a915-90c35d7e2da3" width="180" alt="ShopSync Logo" style="border-radius: 24px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); margin-bottom: 20px;" />

# 🛒 ShopSync

**Smarter search. Better shopping.** *Powered by advanced AI vector search to find exactly what you're looking for across the entire web—instantly.*

[![Next.js](https://img.shields.io/badge/Frontend-Next.js_14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![PyTorch](https://img.shields.io/badge/AI_Model-PyTorch-EE4C2C?style=for-the-badge&logo=pytorch)](https://pytorch.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com/)
[![Hugging Face](https://img.shields.io/badge/Hosted_On-Hugging_Face-FFD21E?style=for-the-badge&logo=huggingface)](https://huggingface.co/)

[![GitHub stars](https://img.shields.io/github/stars/Ali-Hamza852/Shopsync?style=social)](https://github.com/Ali-Hamza852/Shopsync/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Ali-Hamza852/Shopsync?style=social)](https://github.com/Ali-Hamza852/Shopsync/network/members)

<br />

</div>

---

## ⚡ Overview

Traditional e-commerce search relies on basic keyword matching, leaving shoppers with scattered results, endless scrolling, and disconnected prices. 

**ShopSync** changes the game. By leveraging a custom-trained **RoBERTa-based SimCSE Model**, ShopSync understands the *semantic meaning* of your search. It actively scans massive databases from platforms like Amazon and Walmart, clusters identical products together using strict L2-Normalized vector math, and serves the unified results through a lightning-fast modern web interface.

## ✨ Key Features

- **🧠 Semantic AI Search:** Type like a human (e.g., *"cheap black laptop for school"*) and let the LLM-powered backend understand the context, not just the keywords.
- **🎯 95%+ Confidence Clustering:** Identical products across different platforms are merged into unified "Cluster Cards." The model uses a strict `0.95` Cosine Similarity threshold to ensure zero false positives.
- **🚀 Blazing Fast Vector Retrieval:** Utilizing **FAISS (HNSW)**, the backend searches through tens of thousands of dense vectors in milliseconds.
- **🛡️ Triplet-Loss Robustness:** The AI is specifically trained to ignore human typos while violently rejecting "Evil Twin" products (e.g., matching a 128GB phone with a 256GB phone).
- **📱 Glassmorphism UI:** A sleek, responsive, and modern Next.js frontend built with Tailwind CSS.

---

## 🏗️ Architecture & Tech Stack

<details>
<summary><b>💻 Frontend (Client)</b></summary>

- **Framework:** Next.js (App Router) & React
- **Styling:** Tailwind CSS + Framer Motion
- **Security:** Server-side API Proxies to bypass CORS for external product images.

</details>

<details>
<summary><b>⚙️ Backend (Hugging Face Space)</b></summary>

- **API:** FastAPI
- **Model:** Custom RoBERTa (SimCSE Architecture)
- **Vector Index:** FAISS (Hierarchical Navigable Small World)
- **Clustering Threshold:** Strict >0.95 L2-Normalized match

</details>

<details>
<summary><b>🗄️ Database</b></summary>

- **Primary Storage:** MongoDB Atlas (Cloud)
- **Structure:** Pre-clustered payloads for instantaneous O(1) retrieval upon FAISS index hit.

</details>

---

## 🚀 How It Works (The Pipeline)

1. **The Query:** A user types a messy, human-like query into the Next.js search bar.
2. **Vectorization:** The FastAPI backend intercepts the query and passes it through the fine-tuned RoBERTa tokenizer and model, mapping it to a 768-dimensional dense vector space.
3. **The HNSW Search:** The vector is passed into the FAISS index, instantly retrieving the nearest neighbors.
4. **Validation:** Matches are strictly filtered. Anything falling below the `0.95` confidence threshold is discarded.
5. **Hydration:** The winning `group_ids` are sent to MongoDB to fetch the rich product data (URLs, prices, platforms, and titles).
6. **Display:** The Next.js frontend renders the clustered results in a beautiful CSS grid.

---

## 🛠️ Local Development Setup

### 1. Clone the repository
```bash
git clone [https://github.com/Ali-Hamza852/Shopsync.git](https://github.com/Ali-Hamza852/Shopsync.git)
cd Shopsync
