module.exports = {
    run: [
        {
            method: "shell.run",
            params: {
                path: ".",
                message: [
                    "git pull --rebase"
                ]
            }
        },
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
        }
    ]
};
