
document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       TROCAR DE TELA
    ====================================================== */

    function mostrarTela(id) {

        document.querySelectorAll("main").forEach(function (tela) {

            tela.classList.add("escondida");

        });


        const telaEscolhida =
            document.getElementById(id);


        if (telaEscolhida) {

            telaEscolhida.classList.remove("escondida");

        }

    }


    /* =====================================================
       TELA INICIAL
    ====================================================== */

    mostrarTela("telaInicial");


    /* =====================================================
       ENTRAR
    ====================================================== */

    const entrar = document.getElementById("entrar");

if (entrar) {

    entrar.addEventListener("click", function () {

        console.log("BOTÃO ENTRAR CLICADO!");

        // Mostra a tela "Preparando seu cantinho..."
        mostrarTela("telaPreparando");

        // Para o vídeo
        if (videoInicio) {
            videoInicio.pause();
        }

        // Depois de 2,5 segundos vai para a tela de usuário
        setTimeout(function () {

            mostrarTela("telaUsuario");

        }, 2500);

    });

}


    /* =====================================================
       USUÁRIO
    ====================================================== */

    const continuarUsuario =
        document.getElementById("continuarUsuario");

    const usuario =
        document.getElementById("usuario");

    const saudacao =
        document.getElementById("saudacao");


    if (continuarUsuario) {

        continuarUsuario.addEventListener(
            "click",
            function () {

                const nome =
                    usuario.value.trim();


                if (nome === "") {

                    alert(
                        "Digite seu nome para continuar. 💜"
                    );

                    usuario.focus();

                    return;

                }


                saudacao.textContent =
                    "Olá, " + nome;


                mostrarTela("telaSenha");

            }
        );

    }


    if (usuario) {

        usuario.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    continuarUsuario.click();

                }

            }
        );

    }


    /* =====================================================
       SENHA
    ====================================================== */

    const entrarSenha =
        document.getElementById("entrarSenha");

    const senha =
        document.getElementById("senha");


    if (entrarSenha) {

        entrarSenha.addEventListener(
            "click",
            function () {


                if (senha.value !== "2903") {

                    alert(
                        "Senha incorreta. 💜"
                    );

                    senha.value = "";

                    senha.focus();

                    return;

                }


                mostrarTela("telaAcessando");


                setTimeout(function () {

                    mostrarTela("telaBolo");

                }, 3000);

            }
        );

    }


    if (senha) {

        senha.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    entrarSenha.click();

                }

            }
        );

    }


    /* =====================================================
       BOLO
    ====================================================== */

    const cliqueBolo =
        document.getElementById("cliqueBolo");


    const bolo =
        document.getElementById("bolo");


    function entrarNoSite() {

        mostrarTela("paginaPrincipal");

    }


    /* botão */

    if (cliqueBolo) {

        cliqueBolo.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                entrarNoSite();

            }
        );

    }


    /* próprio bolo */

    if (bolo) {

        bolo.addEventListener(
            "click",
            function () {

                entrarNoSite();

            }
        );

    }


    /* =====================================================
       COMEÇAR PRESENTE
    ====================================================== */

    const comecarPresente =
        document.getElementById("comecarPresente");


    if (comecarPresente) {

        comecarPresente.addEventListener(
            "click",
            function () {

                mostrarTela("paginaPresente");

            }
        );

    }


    /* =====================================================
       MENU LATERAL
    ====================================================== */

    const menuItens =
        document.querySelectorAll(".menuItem");


    menuItens.forEach(function (botao) {

        botao.addEventListener(
            "click",
            function () {


                const pagina =
                    botao.dataset.pagina;


                menuItens.forEach(
                    function (item) {

                        item.classList.remove(
                            "ativo"
                        );

                    }
                );


                botao.classList.add("ativo");


                document
                    .querySelectorAll(
                        ".paginaConteudo"
                    )
                    .forEach(
                        function (paginaInterna) {

                            paginaInterna.classList.add(
                                "escondida"
                            );

                        }
                    );


                const nomePagina =
                    pagina.charAt(0).toUpperCase() +
                    pagina.slice(1);


                const paginaEscolhida =
                    document.getElementById(
                        "conteudo" + nomePagina
                    );


                if (paginaEscolhida) {

                    paginaEscolhida.classList.remove(
                        "escondida"
                    );

                }

            }
        );

    });


    /* =====================================================
       FUNÇÃO PARA ABRIR A CARTA
    ====================================================== */

    function mostrarCarta() {


        const inicio =
            document.getElementById(
                "conteudoInicio"
            );


        const carta =
            document.getElementById(
                "conteudoCarta"
            );


        if (inicio) {

            inicio.classList.add(
                "escondida"
            );

        }


        if (carta) {

            carta.classList.remove(
                "escondida"
            );

        }


        menuItens.forEach(
            function (item) {

                item.classList.remove(
                    "ativo"
                );

            }
        );


        const botaoCarta =
            document.querySelector(
                '.menuItem[data-pagina="carta"]'
            );


        if (botaoCarta) {

            botaoCarta.classList.add(
                "ativo"
            );

        }

    }


    /* botão principal da home */

    const botaoAbrirCarta =
        document.getElementById(
            "botaoAbrirCarta"
        );


    if (botaoAbrirCarta) {

        botaoAbrirCarta.addEventListener(
            "click",
            mostrarCarta
        );

    }


    /* segundo botão da home */

    const botaoAbrirCarta2 =
        document.getElementById(
            "botaoAbrirCarta2"
        );


    if (botaoAbrirCarta2) {

        botaoAbrirCarta2.addEventListener(
            "click",
            mostrarCarta
        );

    }


    /* =====================================================
       ABRIR / FECHAR CARTA
    ====================================================== */

    const abrirCarta =
        document.getElementById(
            "abrirCarta"
        );


    const cartaEnvelope =
        document.getElementById(
            "cartaEnvelope"
        );


    if (
        abrirCarta &&
        cartaEnvelope
    ) {


        abrirCarta.addEventListener(
            "click",
            function () {


                cartaEnvelope.classList.toggle(
                    "cartaAberta"
                );


                if (
                    cartaEnvelope.classList.contains(
                        "cartaAberta"
                    )
                ) {

                    abrirCarta.innerHTML =
                        'Fechar carta <span>✦</span>';

                } else {

                    abrirCarta.innerHTML =
                        'Abrir minha carta <span>✦</span>';

                }

            }
        );

    }

});
