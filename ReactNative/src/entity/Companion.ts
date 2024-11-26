export class Companion {
    public id!: string
    public id_guest!: string;
    public name!: string;
    public contact!: string;
    public age!: string;
    public sexy!: string


    constructor(props: Omit<Companion, 'id'>, id?: string) {
        Object.assign(this, props)
    }

}