module.exports = {
    run: [
        // 1. Create Python venv
        {
            method: "shell.run",
            params: {
                path: ".",
                message: [
                    "python -m venv env"
                ]
            }
        },
        // 2. Install GPU-appropriate PyTorch
        {
            method: "script.start",
            params: {
                uri: "torch.js",
                params: {
                    venv: "env",
                    path: "."
                }
            }
        },
        // 3. Install project dependencies (skip torch/torchaudio since already installed)
        {
            method: "shell.run",
            params: {
                venv: "env",
                path: ".",
                message: [
                    "uv pip install --upgrade pip setuptools wheel",
                    "uv pip install -r requirements.txt"
                ]
            }
        },
        // 4. Download the SoulX-Singer SVS model from HuggingFace
        {
            method: "shell.run",
            params: {
                venv: "env",
                path: ".",
                message: [
                    "uv pip install -U huggingface_hub",
                    "huggingface-cli download Soul-AILab/SoulX-Singer --local-dir pretrained_models/SoulX-Singer"
                ]
            }
        },
        // 5. Download preprocessing models from HuggingFace
        {
            method: "shell.run",
            params: {
                venv: "env",
                path: ".",
                message: [
                    "huggingface-cli download Soul-AILab/SoulX-Singer-Preprocess --local-dir pretrained_models/SoulX-Singer-Preprocess"
                ]
            }
        }
    ]
};
