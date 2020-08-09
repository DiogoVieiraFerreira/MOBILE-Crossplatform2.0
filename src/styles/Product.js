import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    background: {
        backgroundColor: "rgba(200, 200, 200, 0.5)",        
        borderColor: 'transparent',
        marginTop: 3,
        borderWidth: 1,
        color: 'white',
        borderRadius: 1,        
        shadowColor: 'black',
        shadowOpacity: 10,
        elevation: 2,
        padding: 10,
    },
    product: {        
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    picture: {
        borderColor: "rgba(0, 0, 0, 0.2)", //TODO to remove later
        backgroundColor: "white",
        borderWidth: 1,
        width: 150,
        height: 150,
        resizeMode: 'contain',
        overflow:"hidden"
    },
    
    informations: {
        flex:1,
        padding: 15,
        paddingTop: 5
    },
    title: {     
        width: "70%",
        fontSize: 15,
        textDecorationLine: "underline",
        fontStyle: 'italic',
        textTransform: "capitalize",
    },
    lastUpdate: {
        position: "absolute",
        right: 15,
        top: 8,
        width: 65,
        fontSize: 12,
        overflow: "hidden",
        color: "rgba(0, 0, 0, 0.6)"
    },
    description: {
        paddingTop: 15,
        paddingBottom: 15,
    },
    stock: {
        height: 40, 
    },
    price:{
        position: "absolute",
        left: 15,
        bottom: 5
    },
    market: {        
        position: "absolute",
        right: 15,
        bottom: 15,
        width: 40,
        height: 40,
        paddingTop: 7,
        paddingLeft: 2,
        borderRadius: 100,
        overflow:"hidden",
        backgroundColor: "rgba(0, 0, 255, 0.4)",
    }
});

export default styles;