import Layout from '../components/layout'
import Head from 'next/head'

const AboutPage = () => {
  return (
    <Layout>
      <Head>
        <title>About | Future Perfect</title>
      </Head>
      <article className="max-w-3xl m-4 space-y-2">
        <h1 className="text-3xl font-bold my-4">Future Perfect</h1>
        <p>
          <span className="font-bold">Future Perfect</span> là tổ chức giáo dục
          cung cấp các lớp học, luyện thi chuẩn hóa hiệu quả và chia sẻ kinh
          nghiệm, kỹ năng tự học tiếng anh giúp học viên Việt Nam theo đuổi định
          hướng tương lai.
        </p>
        <p>
          Ra đời với mong muốn mang lại các khóa học luyện thi chứng chỉ hiệu
          quả, tiết kiệm, chúng mình sẽ là người đồng hành tâm huyết cùng các
          bạn trên hành trình chinh phục các kì thi không hề dễ dàng sắp tới. Dù
          còn non trẻ, nhưng kiến thức và sự nhiệt huyết của đội ngũ{' '}
          <span className="font-bold">Future Perfect</span> chắc chắn sẽ không
          làm bạn thất vọng!
        </p>
        <p>
          Từ niềm tin về sức mạnh của giáo dục, cái tên{' '}
          <span className="font-bold">Future Perfect</span> gợi lên sự quyết tâm
          trong mỗi chúng ta trên con đường học vấn và chinh phục tương lai. Với
          sứ mệnh lấy người học làm trung tâm, chúng mình cam kết sẽ giúp cho
          các bạn học sinh thấy được sự tiến bộ từng ngày thông qua những phương
          pháp học chủ động và hứng thú.
        </p>
        <p>
          Khi những kì thi quan trọng ngày càng tới gần,{' '}
          <span className="font-bold">Future Perfect</span> kỳ vọng sẽ là sự
          giúp đỡ bạn cần để đạt được kết quả mơ ước. Chúng mình sẽ mở các lớp
          học thử và thi thử miễn phí, đồng thời chia sẻ những tài liệu hữu ích
          về các kì thi trong thời gian gần nhất. Hãy theo dõi{' '}
          <span className="font-bold">Future Perfect</span> để không bỏ lỡ cơ
          hội này bạn nhé!
        </p>
      </article>
    </Layout>
  )
}

export default AboutPage
