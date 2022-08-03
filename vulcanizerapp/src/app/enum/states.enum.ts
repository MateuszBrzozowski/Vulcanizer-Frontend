export class State {
  DOLNOSLASKIE = 'Dolnośląskie';
  KUJAWSKO_POMORSKIE = 'Kujawsko-pomorskie';
  LUBELSKIE = 'Lubelskie';
  LUBUSKIE = 'Lubuskie';
  LODZKIE = 'Łódzkie';
  MALOPOLSKIE = 'Małopolskie';
  MAZOWIECKIE = 'Mazowieckie';
  OPOLSKIE = 'Opolskie';
  PODKARPACKIE = 'Podkarpackie';
  PODLASKIE = 'Podlaskie';
  POMORSKIE = 'Pomorskie';
  SLASKIE = 'Śląskie';
  SWIETOKRZYSKIE = 'Świętokrzyskie';
  WARMINSKO_MAZURSKIE = 'Warmińsko-mazurskie';
  WIELKOPOLSKIE = 'Wielkopolskie';
  ZACHODNIO_POMORSKIE = 'Zachodniopomorskie';

  getAllState(): Array<string> {
    let listOfState: Array<string> = [
      this.DOLNOSLASKIE,
      this.KUJAWSKO_POMORSKIE,
      this.LUBELSKIE,
      this.LUBUSKIE,
      this.LODZKIE,
      this.MALOPOLSKIE,
      this.MAZOWIECKIE,
      this.OPOLSKIE,
      this.PODKARPACKIE,
      this.PODLASKIE,
      this.POMORSKIE,
      this.SLASKIE,
      this.SWIETOKRZYSKIE,
      this.WARMINSKO_MAZURSKIE,
      this.WIELKOPOLSKIE,
      this.ZACHODNIO_POMORSKIE,
    ];
    return listOfState;
  }
}
