import express from "express";
import multer from "multer";
import cors from "cors";
import { index, listarTodosPosts, novoPost, uploadFile, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200,
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));
    app.get("/", index);
    app.get("/post", listarTodosPosts);
    app.post("/post", novoPost);  
    app.post("/upload", upload.single("imagem"), uploadFile);
    app.put("/upload/:id", atualizarNovoPost);
}

export default routes;

