import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function Login() {

    const [numeroProcesso, setNumeroProcesso] = useState("");
    const [senhaProcesso, setSenhaProcesso] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);

        try {
            const resposta = await fetch("https://jr-advocacia-processos.onrender.com/login_user", { // mudar para endereço certo
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    numero_processo: numeroProcesso,
                    senha_processo: senhaProcesso
                })
            });

            const dados = await resposta.json();

            if (dados.sucesso) {
                navigate("/processo", {
                    state: dados.processo
                });
            } else {
                alert(dados.mensagem);
            }

        } catch (erro) {
            console.error(erro);
            alert("Erro ao conectar com o servidor.");
        }

        setLoading(false);
    }

    return (
        <div className="login-container">

            <img
                src="/logo.png"
                alt="Logo da empresa"
                className="logo"
            />

            <fieldset>

                <form onSubmit={handleSubmit}>

                    <h1>Consulta Processual</h1>

                    <input
                        type="text"
                        placeholder="Digite o número do processo"
                        value={numeroProcesso}
                        onChange={(e) => setNumeroProcesso(e.target.value)}
                        disabled={loading}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Digite a senha"
                        value={senhaProcesso}
                        onChange={(e) => setSenhaProcesso(e.target.value)}
                        disabled={loading}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Buscando..." : "Entrar"}
                    </button>

                </form>

            </fieldset>

            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}

        </div>
    );
}

export default Login;