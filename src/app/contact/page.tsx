import styles from './contact.module.css'
import Image from 'next/image'
// const HydrationTestNoSSR = dynamic(() => import('@/components/hydrationTest'), { ssr: false })

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with us for any inquiries or support."
}

const ContactPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/contact.png" alt="Contact Us" fill sizes="(max-width: 768px) 100vw, 50vw" className={styles.img} />
      </div>
      <div className={styles.formContainer}>
        {/* <HydrationTestNoSSR /> */}
        {/* <div suppressHydrationWarning>{a}</div> */}
        <form action="" className={styles.form}>
          <input type="text" placeholder="Name and Surname" />
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="Phone Number (Optional)" />
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            placeholder="Message"
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  )
}

export default ContactPage
