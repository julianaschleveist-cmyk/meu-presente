
require('dotenv').config();

const {
    Client,
    GatewayIntentBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');


// =====================================================
// LINKS
// =====================================================

const GITHUB_URL = 'https://julianaschleveist-cmyk.github.io/meu-presente/';

const FIGMA_URL = 'https://www.figma.com/proto/vmn7oN3Pctfg2k3G22LlFY/Niver-do-meu-amor?node-id=0-1&t=MiK7N06q90B8NPTF-1';


// =====================================================
// BOT
// =====================================================

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});


// =====================================================
// BOT ONLINE
// =====================================================

client.once('ready', async () => {

    console.log(`🌙 ${client.user.tag} está online!`);

    const canal = client.channels.cache.find(
        channel => channel.name === '🌙・entrada'
    );

    if (!canal) {
        console.log('❌ Não encontrei o canal 🌙・entrada');
        return;
    }

    const botao = new ActionRowBuilder()
        .addComponents(

            new ButtonBuilder()
                .setCustomId('comecar')
                .setLabel('COMEÇAR')
                .setEmoji('🌙')
                .setStyle(ButtonStyle.Primary)

        );

    await canal.send({
        content: `🌙 **Oi, minha princesa.**

Hoje eu preparei uma pequena surpresa para você.

Mas, antes de chegar até ela, existe um pequeno caminho para percorrer.

Não existem respostas certas.
Não existe pressa.

Só algumas escolhas esperando por você. 💜

Quando estiver pronta...

✨ **Clique abaixo para começar.**`,
        components: [botao]
    });

});


// =====================================================
// INTERAÇÕES DOS BOTÕES
// =====================================================

client.on('interactionCreate', async interaction => {

    if (!interaction.isButton()) {
        return;
    }


    // =================================================
    // COMEÇAR
    // =================================================

    if (interaction.customId === 'comecar') {

        const proximoCanal = interaction.guild.channels.cache.find(
            channel => channel.name === '💜・o-comeco'
        );

        if (!proximoCanal) {

            await interaction.reply({
                content: '❌ Não encontrei o canal 💜・o-comeco.',
                ephemeral: true
            });

            return;
        }

        await proximoCanal.permissionOverwrites.edit(
            interaction.user.id,
            {
                ViewChannel: true,
                SendMessages: true,
                ReadMessageHistory: true
            }
        );

        await interaction.reply({
            content: '🌙 Uma nova porta acabou de ser aberta...',
            ephemeral: true
        });

        const botoes = new ActionRowBuilder()
            .addComponents(

                new ButtonBuilder()
                    .setCustomId('seguir')
                    .setLabel('Seguir o caminho')
                    .setEmoji('🌙')
                    .setStyle(ButtonStyle.Primary),

                new ButtonBuilder()
                    .setCustomId('acontecer')
                    .setLabel('Deixar acontecer')
                    .setEmoji('✨')
                    .setStyle(ButtonStyle.Secondary)

            );

        await proximoCanal.send({
            content: `💜 **Tudo começa em algum lugar.**

Às vezes, não percebemos quando um momento aparentemente pequeno começa a se tornar algo importante.

E talvez algumas das coisas mais bonitas sejam justamente aquelas que a gente não planejou.

Agora você precisa escolher um caminho...

**O que você prefere?** 🌙`,
            components: [botoes]
        });

        return;
    }


    // =================================================
    // SEGUIR O CAMINHO
    // =================================================

    if (interaction.customId === 'seguir') {

        await liberarPrimeiraEscolha(interaction);

        await interaction.reply({
            content: `🌙 **Você escolheu seguir em frente.**

Talvez algumas coisas precisem apenas de coragem para começar.

E parece que esse caminho ainda guarda algumas surpresas...

✨ **Uma nova porta foi aberta.**`,
            ephemeral: false
        });

        return;
    }


    // =================================================
    // DEIXAR ACONTECER
    // =================================================

    if (interaction.customId === 'acontecer') {

        await liberarPrimeiraEscolha(interaction);

        await interaction.reply({
            content: `✨ **Então vamos deixar acontecer.**

Talvez não seja necessário saber exatamente para onde estamos indo.

Às vezes, o caminho fica bonito justamente porque não sabemos o que vem depois.

💜 **Uma nova porta foi aberta.**`,
            ephemeral: false
        });

        return;
    }


    // =================================================
    // CARINHO
    // =================================================

    if (interaction.customId === 'carinho') {

        await interaction.reply({
            content: `💜 **Carinho.**

Talvez seja assim que algumas histórias começam:

com pequenos gestos que, aos poucos, significam cada vez mais.

E algumas pessoas conseguem transformar pequenos momentos em lembranças enormes. 🌙`,
            ephemeral: false
        });

        await liberarPequenoDesvio(interaction);

        return;
    }


    // =================================================
    // DESTINO
    // =================================================

    if (interaction.customId === 'destino') {

        await interaction.reply({
            content: `🌙 **Destino.**

Talvez algumas pessoas simplesmente precisem se encontrar.

E talvez certas coincidências sejam bonitas demais para parecer apenas coincidência. ✨`,
            ephemeral: false
        });

        await liberarPequenoDesvio(interaction);

        return;
    }


    // =================================================
    // ACASO
    // =================================================

    if (interaction.customId === 'acaso') {

        await interaction.reply({
            content: `✨ **Acaso.**

Um encontro inesperado pode mudar completamente o rumo de uma história.

E talvez o acaso tenha um jeito curioso de colocar as pessoas certas no mesmo lugar. 💜`,
            ephemeral: false
        });

        await liberarPequenoDesvio(interaction);

        return;
    }


    // =================================================
    // ESTRELAS
    // =================================================

    if (interaction.customId === 'estrelas') {

        await interaction.reply({
            content: `🌙 **Você olhou para as estrelas.**

Talvez algumas coisas bonitas mereçam ser observadas com calma.

Mas ainda existe algo esperando por você. ✨`,
            ephemeral: false
        });

        await liberarSegundaEscolha(interaction);

        return;
    }


    // =================================================
    // LUA
    // =================================================

    if (interaction.customId === 'lua') {

        await interaction.reply({
            content: `☁️ **Você escolheu olhar para a lua.**

Talvez porque algumas luzes aparecem justamente quando tudo ao redor fica escuro.

E essa ainda não é a última luz desse caminho. 💜`,
            ephemeral: false
        });

        await liberarSegundaEscolha(interaction);

        return;
    }


    // =================================================
    // CONTINUAR
    // =================================================

    if (interaction.customId === 'continuar') {

        await interaction.reply({
            content: `✨ **Você simplesmente continuou.**

Talvez confiar seja uma das formas mais bonitas de seguir em frente.

Então continue. 🌙`,
            ephemeral: false
        });

        await liberarSegundaEscolha(interaction);

        return;
    }


    // =================================================
    // CORAJOSA
    // =================================================

    if (interaction.customId === 'corajosa') {

        await interaction.reply({
            content: `🌸 **Corajosa.**

Talvez você nem perceba o quanto é corajosa.

Mesmo quando sente medo, mesmo quando as coisas ficam difíceis, existe dentro de você uma força que continua te fazendo seguir em frente.

E talvez uma das coisas mais bonitas em você seja justamente essa coragem de continuar sendo você. 💜`,
            ephemeral: false
        });

        await liberarQuaseLa(interaction);

        return;
    }


    // =================================================
    // SONHADORA
    // =================================================

    if (interaction.customId === 'sonhadora') {

        await interaction.reply({
            content: `✨ **Sonhadora.**

Talvez você tenha dentro de si um mundo muito maior do que imagina.

E espero que nunca deixe de sonhar com as coisas que fazem seus olhos brilharem. 🌙`,
            ephemeral: false
        });

        await liberarQuaseLa(interaction);

        return;
    }


    // =================================================
    // DETERMINADA
    // =================================================

    if (interaction.customId === 'determinada') {

        await interaction.reply({
            content: `🌙 **Determinada.**

Talvez você seja muito mais forte do que costuma perceber.

E mesmo quando duvida de si mesma, continua seguindo.

Isso também é uma forma de força. 💜`,
            ephemeral: false
        });

        await liberarQuaseLa(interaction);

        return;
    }


    // =================================================
    // UM POUCO DE TODAS
    // =================================================

    if (interaction.customId === 'todas') {

        await interaction.reply({
            content: `💜 **Um pouco de todas.**

Talvez essa seja a resposta mais verdadeira.

Porque você não precisa caber em uma única palavra.

Você pode ser delicada, forte, sonhadora, engraçada, carinhosa...

E continuar sendo você. 🌙`,
            ephemeral: false
        });

        await liberarQuaseLa(interaction);

        return;
    }


    // =================================================
    // ESTOU PRONTA
    // =================================================

    if (interaction.customId === 'estou_pronta') {

        const proximoCanal = interaction.guild.channels.cache.find(
            channel => channel.name === '🎁・a-ultima-porta'
        );

        if (!proximoCanal) {

            await interaction.reply({
                content: '❌ Não encontrei o canal 🎁・a-ultima-porta.',
                ephemeral: true
            });

            return;
        }

        // Libera o canal da última porta
        await proximoCanal.permissionOverwrites.edit(
            interaction.user.id,
            {
                ViewChannel: true,
                SendMessages: true,
                ReadMessageHistory: true
            }
        );

        // Resposta no canal Quase Lá
        await interaction.reply({
            content: `🌙 **Então chegou a hora.**

Você está pronta.

A última porta acabou de ser aberta...

✨ **Existe apenas mais um passo.**`,
            ephemeral: false
        });

        // Caixa clicável para ir até a última porta
        const botaoUltimaPorta = new ActionRowBuilder()
            .addComponents(

                new ButtonBuilder()
                    .setCustomId('ir_ultima_porta')
                    .setLabel('IR PARA A ÚLTIMA PORTA')
                    .setEmoji('🎁')
                    .setStyle(ButtonStyle.Primary)

            );

        await interaction.channel.send({
            content: `🎁 **Uma nova porta apareceu.**

Você chegou ao fim do caminho.

Agora existe apenas uma última coisa esperando por você.

Quando estiver pronta...

✨ **clique abaixo para continuar.**`,
            components: [botaoUltimaPorta]
        });

        return;
    }


    // =================================================
    // IR PARA A ÚLTIMA PORTA
    // =================================================

    if (interaction.customId === 'ir_ultima_porta') {

        const ultimaPorta = interaction.guild.channels.cache.find(
            channel => channel.name === '🎁・a-ultima-porta'
        );

        if (!ultimaPorta) {

            await interaction.reply({
                content: '❌ Não encontrei o canal 🎁・a-ultima-porta.',
                ephemeral: true
            });

            return;
        }

        await interaction.reply({
            content: '🎁 **A última porta está esperando por você...**',
            ephemeral: true
        });

        // Botão que abre o Figma
        const botaoFigma = new ActionRowBuilder()
            .addComponents(

                new ButtonBuilder()
                    .setLabel('ABRIR MEU PRESENTE')
                    .setEmoji('💜')
                    .setStyle(ButtonStyle.Link)
                    .setURL(FIGMA_URL)

            );

        await ultimaPorta.send({
            content: `🎁 **A última porta.**

Você chegou até aqui.

Fez suas escolhas.
Seguiu o caminho.

E agora não existe mais nenhuma escolha para fazer.

Só existe uma última coisa esperando por você.

Uma pequena surpresa que preparei com muito carinho.

Quando estiver pronta...

🌙 **abra meu presente.**`,
            components: [botaoFigma]
        });

        return;
    }

});


// =====================================================
// FUNÇÃO: LIBERAR PRIMEIRA ESCOLHA
// =====================================================

async function liberarPrimeiraEscolha(interaction) {

    const proximoCanal = interaction.guild.channels.cache.find(
        channel => channel.name === '✨・primeira-escolha'
    );

    if (!proximoCanal) {

        await interaction.followUp({
            content: '❌ Não encontrei o canal ✨・primeira-escolha.',
            ephemeral: true
        });

        return;
    }

    await proximoCanal.permissionOverwrites.edit(
        interaction.user.id,
        {
            ViewChannel: true,
            SendMessages: true,
            ReadMessageHistory: true
        }
    );

    const botoes = new ActionRowBuilder()
        .addComponents(

            new ButtonBuilder()
                .setCustomId('carinho')
                .setLabel('Carinho')
                .setEmoji('💜')
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId('destino')
                .setLabel('Destino')
                .setEmoji('🌙')
                .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
                .setCustomId('acaso')
                .setLabel('Acaso')
                .setEmoji('✨')
                .setStyle(ButtonStyle.Secondary)

        );

    await proximoCanal.send({
        content: `✨ **Primeira escolha.**

Existem pessoas que chegam devagar.

Primeiro são apenas uma presença.

Depois viram uma conversa.
Uma companhia.
Um sorriso.

Até que, quando percebemos...

já ocupam um espaço enorme dentro da gente. 💜

Se pudesse escolher uma palavra para descrever algo assim, qual seria?`,
        components: [botoes]
    });

}


// =====================================================
// FUNÇÃO: LIBERAR PEQUENO DESVIO
// =====================================================

async function liberarPequenoDesvio(interaction) {

    const proximoCanal = interaction.guild.channels.cache.find(
        channel => channel.name === '🌌・um-pequeno-desvio'
    );

    if (!proximoCanal) {

        await interaction.followUp({
            content: '❌ Não encontrei o canal 🌌・um-pequeno-desvio.',
            ephemeral: true
        });

        return;
    }

    await proximoCanal.permissionOverwrites.edit(
        interaction.user.id,
        {
            ViewChannel: true,
            SendMessages: true,
            ReadMessageHistory: true
        }
    );

    const botoes = new ActionRowBuilder()
        .addComponents(

            new ButtonBuilder()
                .setCustomId('estrelas')
                .setLabel('Olhar para as estrelas')
                .setEmoji('🌙')
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId('lua')
                .setLabel('Olhar para a lua')
                .setEmoji('☁️')
                .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
                .setCustomId('continuar')
                .setLabel('Fechar os olhos e continuar')
                .setEmoji('✨')
                .setStyle(ButtonStyle.Secondary)

        );

    await proximoCanal.send({
        content: `🌌 **Um pequeno desvio.**

Mas nem todo caminho é feito apenas de linhas retas.

Às vezes precisamos parar.

Olhar ao redor.

Perceber onde estamos.

E lembrar por que começamos.

Então, antes de continuar...

**escolha uma pequena coisa.** 💜`,
        components: [botoes]
    });

}


// =====================================================
// FUNÇÃO: LIBERAR SEGUNDA ESCOLHA
// =====================================================

async function liberarSegundaEscolha(interaction) {

    const proximoCanal = interaction.guild.channels.cache.find(
        channel => channel.name === '🌙・segunda-escolha'
    );

    if (!proximoCanal) {

        await interaction.followUp({
            content: '❌ Não encontrei o canal 🌙・segunda-escolha.',
            ephemeral: true
        });

        return;
    }

    await proximoCanal.permissionOverwrites.edit(
        interaction.user.id,
        {
            ViewChannel: true,
            SendMessages: true,
            ReadMessageHistory: true
        }
    );

    const botoes = new ActionRowBuilder()
        .addComponents(

            new ButtonBuilder()
                .setCustomId('corajosa')
                .setLabel('A corajosa')
                .setEmoji('🌸')
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId('sonhadora')
                .setLabel('A sonhadora')
                .setEmoji('✨')
                .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
                .setCustomId('determinada')
                .setLabel('A determinada')
                .setEmoji('🌙')
                .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
                .setCustomId('todas')
                .setLabel('Um pouco de todas')
                .setEmoji('💜')
                .setStyle(ButtonStyle.Secondary)

        );

    await proximoCanal.send({
        content: `🌙 **Agora eu quero que você escolha pensando em você.**

Não pense muito.

Apenas escolha aquilo que parece combinar mais com você.

Quando ninguém está olhando...

**quem é você?** 💜`,
        components: [botoes]
    });

}


// =====================================================
// FUNÇÃO: LIBERAR QUASE LÁ
// =====================================================

async function liberarQuaseLa(interaction) {

    const proximoCanal = interaction.guild.channels.cache.find(
        channel => channel.name === '💌・quase-la'
    );

    if (!proximoCanal) {

        await interaction.followUp({
            content: '❌ Não encontrei o canal 💌・quase-la.',
            ephemeral: true
        });

        return;
    }

    await proximoCanal.permissionOverwrites.edit(
        interaction.user.id,
        {
            ViewChannel: true,
            SendMessages: true,
            ReadMessageHistory: true
        }
    );

    // Botão para abrir o GitHub
    const botaoGitHub = new ActionRowBuilder()
        .addComponents(

            new ButtonBuilder()
                .setLabel('ABRIR MEU PRESENTE')
                .setEmoji('💜')
                .setStyle(ButtonStyle.Link)
                .setURL(GITHUB_URL)

        );

    // Botão para seguir para a última porta
    const botaoPronta = new ActionRowBuilder()
        .addComponents(

            new ButtonBuilder()
                .setCustomId('estou_pronta')
                .setLabel('ESTOU PRONTA')
                .setEmoji('🌙')
                .setStyle(ButtonStyle.Primary)

        );

    await proximoCanal.send({
        content: `💌 **Antes da última porta...**

Eu queria que você parasse por alguns segundos.

Olhasse para tudo que existe ao seu redor.

E lembrasse de uma coisa:

**você é muito mais especial do que às vezes consegue perceber.**

Talvez você não enxergue todos os detalhes bonitos que existem em você.

Talvez nem perceba o quanto sua presença pode fazer diferença.

Mas alguém percebe.

**Eu percebo.** 💜

E foi por isso que eu quis preparar tudo isso para você.

Não precisava ser algo grandioso.

Eu só queria criar um pequeno cantinho que fosse **seu**.

Agora falta apenas uma última escolha.`,
        components: [botaoGitHub, botaoPronta]
    });

}


// =====================================================
// LOGIN DO BOT
// =====================================================

client.login(process.env.DISCORD_TOKEN);