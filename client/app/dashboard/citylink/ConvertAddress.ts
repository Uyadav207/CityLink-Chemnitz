interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

function convertAddress({
  id,
  street,
  city,
  state,
  zipCode,
  country,
}: Address) {
  const name: string = `${street}, ${city}, ${state}, ${zipCode}, ${country}`;
  return { id, name };
}

export default function convertHomeAddress(addresses: any) {
  return addresses?.map((address: any) => {
    const { id, street, city, state, zipCode, country } = address;
    return convertAddress({ id, street, city, state, zipCode, country });
  });
}
