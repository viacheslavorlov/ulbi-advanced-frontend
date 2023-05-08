import { Currency } from '@/entities/Currency/model/consts/currency';
import { Country } from '@/entities/Country/model/consts/country';

export interface ProfileType {
    id?: string;
    first?: string;
    last?: string;
    age?: number;
    currency?: Currency;
    country?: Country;
    city?: string;
    username?: string;
    avatar?: string;
}
