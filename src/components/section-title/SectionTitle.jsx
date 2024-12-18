import "./SectionTitle.css"

const SectionTitle = ({title, subtitle}) => {
  return (
    <>
      <h2 className="inner-title">{title}</h2>
      <h3 className="inner-subtitle">{subtitle}</h3>
    </>
  )
}

export default SectionTitle