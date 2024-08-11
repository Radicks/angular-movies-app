export class Movie {

    constructor(
      public name: string,
      public directorID: string,
      public actorIDs: string[],
      public isAvailable: boolean,
      public genres: string[],
      public year: number
    ) {}
  
  }