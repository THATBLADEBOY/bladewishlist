import SideNav from "../components/SideNav";

const WishListPage = () => {
  // const { data } = useWishListQuery();

  return (
    <SideNav>
      <h1>Wish List</h1>
      {/* <ul>
            {data?.wishList.map((item) => (
            <li key={item.id}>{item.name}</li>
            ))}
        </ul> */}
    </SideNav>
  );
};

export default WishListPage;
