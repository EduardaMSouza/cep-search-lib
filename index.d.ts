import CepSearch from "./CepSearch";
import useCep from "./useCep";

declare module 'cep-search-lib' {
    export { default as CepSearch } from './CepSearch';
    export { default as useCep } from './useCep';
}
