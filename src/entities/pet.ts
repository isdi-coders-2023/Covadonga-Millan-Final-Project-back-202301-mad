export type Pet = {
  id: string;
  name: string;
  kg: number;
  age: number;
  species: string;
  breed: string;
  owner: string;
  phone: number;
  email: string;
  temper: string;
  gender: string;
  img?: string;
  symptoms: string[];
  exam: {
    temperature: number;
    hr: number;
    rr: number;
    membrane: string;
    cap: number;
    sap: number;
    dap: number;
    map: number;
  };
  meds: {
    fluids: string;
    med: string;
    ml: number;
    hour: number;
    via: string;
  };
};
