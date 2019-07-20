export class DrugInventory {
  constructor(
    public id: number,
    public barCodeId: number,
    public drugName: string,
    public unitPrice: number,
    public sellingPrice: number,
    public inventory: number,
    public expiryDate: Date,
    public quantity: number,
    public manufacturer: string,
    public notes: string

  ) {

  }
}







