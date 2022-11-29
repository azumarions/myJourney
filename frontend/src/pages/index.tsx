import { Box, Grid } from "@mui/material";
import { color } from "@mui/system";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css'; // デフォルトのテーマを読み込んでいます（コアスタイルのみ読み込む設定も可能）
import Image from "next/image";
import Layout from "../components/Layout";

export const Home = () => {
  return (
    <Layout title="Home">
      <Grid container  sx={{ mt: -6}}>
      <Grid item justifyItems="center" textAlign="center">
      <Splide
        aria-label="私のお気に入りの画像集"
        options={{
          autoplay: true, // 自動再生を有効
          interval: 3000, // 自動再生の間隔を3秒に設定
        }}
      >
          <SplideSlide>
            <Box sx={{position: "relative" }}>
              <Box sx={{position: "absolute", textAlign: "center", fontSize: 28, color: "white", }}>SUNSET</Box>
              <Box sx={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}>
                <img src={"/homeImage1.png"} alt="part1" />
              </Box>
            </Box>
          </SplideSlide>    
          <SplideSlide>
            <Box sx={{position: "relative"}}>
              <Box sx={{position: "absolute", textAlign: "center", fontSize: 28, color: "white",}}>SUNSET</Box>
              <Box sx={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}>
                <img src={"/homeImage2.png"} alt="part2" />
              </Box>
            </Box>
          </SplideSlide>     
          <SplideSlide>
            <Box sx={{position: "relative"}}>
              <Box sx={{position: "absolute", textAlign: "center", fontSize: 28, color: "white",}}>SUNSET</Box>
              <Box sx={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}>
                <img src={"/homeImage3.png"} alt="part3" />
              </Box>
            </Box>          
          </SplideSlide>       
          <SplideSlide>
            <Box sx={{position: "relative"}}>
              <Box sx={{position: "absolute", textAlign: "center", fontSize: 28, color: "white",}}>SUNSET</Box>
              <Box sx={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}>
                <img src={"/homeImage4.png"} alt="part3" />
              </Box>
            </Box>          
          </SplideSlide>     
          <SplideSlide>
            <Box sx={{position: "relative"}}>
              <Box sx={{position: "absolute", textAlign: "center", fontSize: 28, color: "white",}}>SUNSET</Box>
              <Box sx={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}>
                <img src={"/homeImage5.png"} alt="part3" />
              </Box>
            </Box>            
          </SplideSlide>
      </Splide>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box sx={{fontSize: { xs: 26, sm: 28, md: 32, lg: 35 }, textAlign: "center"}}>Test</Box>
          <Box sx={{fontSize: { xs: 14, sm: 16, md: 20, lg: 24 }, p: 1}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
            in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
             in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
             sunt in culpa qui officia deserunt mollit anim id est laborum. */}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box sx={{p: {xs: 0, sm: 0, md: 0, lg: 0}, }}>
            <Image width="600" height="600" src={"/homeImage6.jpeg"} alt="part3" />
          </Box>
        </Grid>
      </Grid>
      </Grid>

      {/* 画像の高さを揃えて表示させるために以下スタイルを適用 */}
      <style jsx>{`
        .slide-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </Layout>
  );

  // const image = new Array("/1c229c2e6b28461ba1b68b3d056d76c7b.jpeg", "/1c229c2e6b28461ba1b68b3d056d76c7雲海テラス.jpeg", "/1c229c2e6b28461ba1b68b3d056d76c7天狗山.jpeg")

  // return (
  //   <Layout title="Home">
  //     <Grid container justifyItems="center" textAlign="center">
  //       <Grid item xs={12} sm={6} md={4} lg={4}>
  //         <img alt="name" height="100vh" src={"/1c229c2e6b28461ba1b68b3d056d76c7b.jpeg"} />
  //       </Grid>
  //       <Grid item xs={12} sm={6} md={4} lg={4} sx={{ display: { xs: "none", sm: "block", md: "block", lg: "block" }}}>
  //         <img alt="name" height="100vh" src={"/1c229c2e6b28461ba1b68b3d056d76c7雲海テラス.jpeg"} />
  //       </Grid>
  //       <Grid item xs={12} sm={12} md={4} lg={4} sx={{ display: { xs: "none", sm: "none", md: "block", lg: "block" }}}>
  //         <img alt="name" height="100vh"  src={"/1c229c2e6b28461ba1b68b3d056d76c7天狗山.jpeg"} />
  //       </Grid>
  //     </Grid>
  //   </Layout>
  // )
}
export default Home