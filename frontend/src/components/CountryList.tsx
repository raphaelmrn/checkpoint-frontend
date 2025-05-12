import "./CountryList.css";

export function CountryList({ data }: { data: any }) {
  return (
    <div className="country-list">
      {data.countries.map((country: any) => (
        <div key={country.id} className="country-card">
          <div className="country-emoji">{country.emoji}</div>
          <div className="country-name">{country.name}</div>
        </div>
      ))}
    </div>
  );
}
