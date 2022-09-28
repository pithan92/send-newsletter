import * as _ from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const validateBirthDay = (date: string): string => {
  if (date?.split('/').length === 3) {
    const isValid = _.isMatch(date, 'dd/MM/yyyy', { locale: ptBR });
    if (isValid) {
      const dateBirthDay = _.parse(date, 'dd/MM/yyyy', new Date());
      return dateBirthDay.getTime() < Date.now() ? date : null;
    }
  }
};
export const validadeEmail = (email: string) => {
  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regexExp.test(email) ? email : null;
};
