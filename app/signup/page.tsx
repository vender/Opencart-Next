import Container from "#/components/ui/container";
import SignUpForm from "#/components/auth/sign-up-form";

async function page() {
  
  return (
    <>
		<Container>
			<div className="py-16 lg:py-20">
				<SignUpForm className="w-500px" addressShow={true} />
			</div>
		</Container>
	</>
  );
}

export default page;
