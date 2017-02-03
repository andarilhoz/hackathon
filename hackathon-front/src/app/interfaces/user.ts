export interface User {
    _id: string;
    username: string;
    cpf: string;
    inscricao: string;
    email: string;
    confirmEmail: string;
    spended: string;
    percent: string;
    password: string;
    userScore: number;
    userCount: number;
    contas: Array<any>;
}
