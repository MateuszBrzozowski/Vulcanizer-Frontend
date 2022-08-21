export class DialogInfo {
    type : DialogInfoType = DialogInfoType.INFO;
    message: string = '';

    constructor(type: DialogInfoType, message : string){
        this.type = type;
        this.message = message;
    }
}

export enum DialogInfoType {
  SUCCESS = 'Sukces',
  ERROR = 'Błąd',
  INFO = 'Informacja',
  WARNING = 'Uwaga',
}