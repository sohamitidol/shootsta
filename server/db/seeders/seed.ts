import { seed as seedAmbulance } from "./ambulance";
import { seed as seedDoctor } from "./doctor";

const NUMBER_OF_RECORDS_TO_SEED = 10; // adjust variable as number of records need to be seeded
seedAmbulance(NUMBER_OF_RECORDS_TO_SEED);
seedDoctor(NUMBER_OF_RECORDS_TO_SEED);
