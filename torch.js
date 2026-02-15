module.exports = {
    run: [
        // Windows / Linux NVIDIA 50-series (requires cu130 for Blackwell)
        {
            when: "{{gpu === 'nvidia' && kernel.gpus && kernel.gpus.find(x => / 50.+/.test(x.model))}}",
            method: "shell.run",
            params: {
                venv: "{{args && args.venv ? args.venv : null}}",
                path: "{{args && args.path ? args.path : '.'}}",
                message: [
                    "uv pip install torch==2.10.0 torchvision==0.25.0 torchaudio==2.10.0 --index-url https://download.pytorch.org/whl/cu130"
                ]
            },
            next: null
        },
        // Windows NVIDIA
        {
            when: "{{platform === 'win32' && gpu === 'nvidia'}}",
            method: "shell.run",
            params: {
                venv: "{{args && args.venv ? args.venv : null}}",
                path: "{{args && args.path ? args.path : '.'}}",
                message: [
                    "uv pip install torch==2.10.0 torchvision==0.25.0 torchaudio==2.10.0 --index-url https://download.pytorch.org/whl/cu130"
                ]
            },
            next: null
        },
        // Linux NVIDIA
        {
            when: "{{platform === 'linux' && gpu === 'nvidia'}}",
            method: "shell.run",
            params: {
                venv: "{{args && args.venv ? args.venv : null}}",
                path: "{{args && args.path ? args.path : '.'}}",
                message: [
                    "uv pip install torch==2.10.0 torchvision==0.25.0 torchaudio==2.10.0 --index-url https://download.pytorch.org/whl/cu130"
                ]
            },
            next: null
        },
        // Windows AMD (DirectML)
        {
            when: "{{platform === 'win32' && gpu === 'amd'}}",
            method: "shell.run",
            params: {
                venv: "{{args && args.venv ? args.venv : null}}",
                path: "{{args && args.path ? args.path : '.'}}",
                message: [
                    "uv pip install torch-directml torchaudio==2.8.0"
                ]
            },
            next: null
        },
        // macOS universal
        {
            when: "{{platform === 'darwin'}}",
            method: "shell.run",
            params: {
                venv: "{{args && args.venv ? args.venv : null}}",
                path: "{{args && args.path ? args.path : '.'}}",
                message: [
                    "uv pip install torch==2.8.0 torchaudio==2.8.0"
                ]
            },
            next: null
        },
        // Fallback CPU wheels
        {
            when: "{{true}}",
            method: "shell.run",
            params: {
                venv: "{{args && args.venv ? args.venv : null}}",
                path: "{{args && args.path ? args.path : '.'}}",
                message: [
                    "uv pip install torch==2.8.0 torchaudio==2.8.0 --index-url https://download.pytorch.org/whl/cpu"
                ]
            },
            next: null
        }
    ]
};
