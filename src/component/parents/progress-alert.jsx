import Image from "next/image";

export default function ProgressAlert() {
  return (
    <div className="progress-alert position-relative">
      <div className="progress-alert-content">
        <h5>Great progress! Your child is taking <br /> 30% more classes than last year.</h5>
        <div className="d-flex align-items-xl-center flex-column flex-xl-row gap-2 gap-xl-4">
          <small>
            <Image src="/images/sms.png" width={50} height={50} className="pa_icon2" alt="Child Progress" />
            heatersmorris@mail.com
          </small>

          <small>
            <Image src="/images/call.png" width={50} height={50} className="pa_icon2" alt="Child Progress" />
            +28 1234 5678
          </small>
        </div>
      </div>
      <Image src="/images/alert-banner-img.png" className="pa_img" width={142} height={142} alt="Child Progress" />
    </div>
  )
}
