import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, ActivityIndicator, StatusBar, Alert } from 'react-native';
import FormRow from '../components/FormRow';

import { connect } from 'react-redux';
import { tryLogin } from '../actions';

const firebase = require("firebase");

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mail: '',
            password: '',
            isLoading: false,
            message: ''
        }
    }

    componentDidMount() {
        const config = {
            apiKey: "AIzaSyDm5hsmHjUVc0VMOZDzVgo8vSW8J-C1uNA",
            authDomain: "series-e4811.firebaseapp.com",
            databaseURL: "https://series-e4811.firebaseio.com",
            projectId: "series-e4811",
            storageBucket: "series-e4811.appspot.com",
            messagingSenderId: "22810160451"
        };
        firebase.initializeApp(config);
    }

    onChangeHandler(field, value) {
        this.setState({ 
            [field]: value
        });
    }

    tryLogin() {
        this.setState({ isLoading: true, message: '' });
        const { mail: email, password } = this.state;

        this.props.tryLogin({ email, password })
            .then(user => {
                if (user) {
                    return this.props.navigation.replace('Main');
                }

                this.setState({
                    isLoading: false,
                    message: ''
                })
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    message: this.getMessageByErrorCode(error.code)
                });
            });
    }   

    getMessageByErrorCode(errorCode) {
        switch (errorCode) {
            case 'auth/user-not-found':
                return 'Usuário não encontrado';
            case 'auth/wrong-password':
                return 'Senha incorreta';
            default:
                return 'Erro desconhecido';
        }
    }
    renderButton() {
        if(this.state.isLoading)
            return <ActivityIndicator />

        return (
            <Button 
                title="Entrar"
                onPress={() => this.tryLogin()} />
        )
    }

    renderMessage() {
        const { message } = this.state;
        if(!message)
            return null;

        return (
            <View>
                <Text>{ message }</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar 
                    backgroundColor='#4682B4'
                />
                <FormRow first>
                    <TextInput 
                        style={styles.input}
                        placeholder="user@mail.com"
                        value={this.state.mail}
                        onChangeText={value => this.onChangeHandler('mail', value) }
                    />
                </FormRow>
                <FormRow last>
                    <TextInput
                        style={styles.input}
                        placeholder="******"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={value => this.onChangeHandler('password', value)}
                    />
                </FormRow>
                { this.renderButton() }
                { this.renderMessage() }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingRight: 10,
        paddingLeft: 10,
        /* flex: 1,
        justifyContent: 'center' */
    },
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5
    }
})

export default connect(null, { tryLogin })(LoginPage)