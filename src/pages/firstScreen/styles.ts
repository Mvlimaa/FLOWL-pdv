import { StyleSheet } from "react-native";


export const style = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        
        alignItems: 'center',
        // Troquei de 'center' para 'space-around' para um melhor espaçamento vertical
        justifyContent: 'space-around',
        paddingTop: 80, // Adiciona um padding superior
        paddingBottom: 50, // Adiciona um padding inferior
    },
    logo:{
        // Ocupa a parte superior da tela com logo e textos
        alignItems: 'center',
        // Reduzi a margem, pois o `space-around` já está espaçando
        // marginBottom: 0 
    },
    // ✨ Novo Estilo: Título principal
    title: {
        fontSize: 32,
        fontWeight: 'bold', // Adicionar negrito para destaque
        color: 'black', // Cor preta para alto contraste com o fundo claro
        marginTop: 30, // Espaço após a logo
        // Se a fonte 'Pacifico' tiver sido importada corretamente, ela pode ser usada aqui também:
        // fontFamily: 'Pacifico', 
    },
    // ✨ Novo Estilo: Subtítulo
    subtitle: {
        fontSize: 18,
        color: '#333333', // Um cinza escuro para ser menos agressivo que o preto
        textAlign: 'center',
        width: '75%',
        marginTop: 10,
    },
    button:{
        backgroundColor:'black',
        width:225,
        // Reduza a altura para um visual mais moderno
        height: 70, 
        borderRadius: 25,

        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',

        // Mantive a sombra original
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 10, // Aumentei a sombra para um efeito mais dramático
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10, // Aumentei a elevação para mais profundidade
    },
    text:{
        // Mantive o nome 'text', mas usei 'fontWeight: bold' junto com a fonte para melhor legibilidade no botão
        fontFamily: 'Pacifico', 
        fontSize: 25,
        color:'white',
        textAlign: 'center',
        fontWeight: 'bold', 
    }
})