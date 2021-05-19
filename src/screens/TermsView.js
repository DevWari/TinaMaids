import React from 'react';
import { View, Text, TouchableOpacity, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import { navigate } from 'src/utils/navigation';
import Menu from 'src/components/TermsMenu'
import Icon from 'react-native-vector-icons/AntDesign'

const TermsView = () => {

  return (
    <ScrollView>
        <Container>      
          <Menu title="Privacy Policy/Agreement" routeName="RegisterScreen"/>
          <ContentContainer>
            <Footer />
            <Title>Cancellations</Title>
              <Footer />
              <Content>
                If you need to cancel your scheduled appointment, 
                we require notification 48 hours prior to the 
                cleaning date. Please note, if we are not notified 
                of your cancellation, or if we can't get access to 
                your property on the day of your scheduled 
                cleaning, you will incur a minimum fee of 50% 
                of the clean price. We are always willing to help 
                and work together with our clients. Please call us 
                and let us know if any issues arise. 1 (866) 49MAIDS 
                or by using our mobile app/website.</Content>
                <Footer />
            <Title>Employee Safety</Title>
              <Footer />
              <Content>
                The safety of our employees is extremely important. 
                To decrease the risk of injury to employees we are 
                unable to move heavy objects, flip mattresses, etc. 
                Our employees cannot touch or pick up vomit, 
                blood, pet/human urine or excrement, including 
                emptying/cleaning litter boxes. If an employee 
                feels that their personal safety is in danger, and the 
                employee must leave the job site, the client is still 
                responsible for the full cost of the job.
                {'\n'}{'\n'}
                Tina Maids reserves the right to remove its 
                employees from your home, should the environment 
                become unsafe or if we feel that a home has the 
                potential to be considered a bio-hazard. If this is 
                the case, we have the right to refuse service.
                {'\n'}{'\n'}
                We require a safe working environment, including 
                people, property, and pets. Just as you expect our 
                staff to ensure your safety as they are working, 
                we must be able to make sure they will be safe as well.
                {'\n'}{'\n'}
                It is to the client’s advantage to have the home 
                picked up as much as possible allowing us to be 
                able to get to all areas so that we can optimize 
                your cleaning. At Tina Maids, we provide light 
                straightening of the areas that we clean. If such 
                areas/surfaces are cluttered at the time of cleaning, 
                your team will clean around those areas and you 
                will be notified.
                {'\n'}{'\n'}
                Insect infestation can be an issue and may 
                prevent us from cleaning your home. If we 
                encounter an infestation of ants, termites, roaches, 
                bed bugs, etc, we will not clean until the problem 
                has been dealt with.
                {'\n'}{'\n'}
                We Thank you for your understanding and 
                look forward to working with you.</Content>
                <Footer />
            <Title>APP/SERVICE/WEBSITE POLICY</Title>
                <Footer />
              <Content>
                This Agreement is between you and 
                Tina Maids Franchise LLC.
                {'\n'}{'\n'}
                THIS AGREEMENT CONTAINS WARRANTY 
                DISCLAIMERS AND OTHER PROVISIONS THAT 
                LIMIT OUR LIABILITY TO YOU. PLEASE READ 
                THESE TERMS AND CONDITIONS CAREFULLY 
                AND IN THEIR ENTIRETY, AS USING, ACCESSING, 
                AND/OR BROWSING OUR WEBSITE CONSTITUTES 
                ACCEPTANCE OF THESE TERMS AND 
                CONDITIONS. IF YOU DO NOT AGREE TO 
                BEING BOUND TO EACH AND EVERY TERM 
                AND CONDITION SET FORTH HEREIN, PLEASE 
                EXIT OUR WEBSITE IMMEDIATELY AND DO 
                NOT USE, ACCESS, AND/OR BROWSE IT FURTHER. 
                {'\n'}{'\n'}
                Except as otherwise noted, this Agreement 
                constitutes the entire and only Agreement between 
                you and Tina Maids Franchise LLC. and supersedes 
                all other Agreements, representations, warranties, 
                and understandings with respect to our 
                Websites/apps, Services, and the subject matter 
                contained herein.  However, in order for you to 
                use our Websites/apps and/or Services you may 
                also be required to agree to additional terms and 
                conditions. Those additional terms and conditions 
                will be incorporated into this Agreement unless 
                otherwise stated.</Content>
                <Footer />
            <Title>Privacy Policy</Title>
                <Footer />
              <Content>
                Our Privacy Policy is considered part of this 
                Agreement and available on this website. You 
                must review our Privacy Policy by clicking on this 
                link. If you do not accept and agree to being bound 
                by all of the terms of this Agreement, including the 
                www.tinamaids.com Privacy Policy, do not use this 
                Websites/apps or our Services. </Content>
                <Footer />
            <Title>Arbitration</Title>
                <Footer />
              <Content>
                Any legal controversy or claim arising from or 
                relating to this Agreement and/or our Service, 
                excluding legal action taken by us to collect or 
                recover damages for, or obtain any injunction 
                relating to website operations, intellectual property, 
                and our Service will be settled solely by binding 
                arbitration in accordance with the commercial 
                arbitration rules of the American Arbitration 
                Association. Any such controversy or claim 
                will be arbitrated on an individual basis, and 
                will not be consolidated in any arbitration with 
                any claim or controversy of any other party.
                The arbitration will be conducted in Saint Augustine, 
                Floridaand judgment on the arbitration award may 
                be entered into any court having jurisdiction thereof. 
                You or we may seek any interim or preliminary 
                relief from a court of competent jurisdiction in 
                Saint Augustine, Florida necessary to protect the 
                rights or property of you and us pending the 
                completion of arbitration. Each party will bear a 
                half of the arbitration fees and costs.</Content>
                <Footer />
             <Title>Choice of Law and Jurisdiction</Title>
                <Footer />
              <Content>
                This Agreement will be treated as if it were executed 
                and performed in Saint Augustine, Florida, and will 
                be governed by and construed in accordance 
                with the laws of the state of Florida without regard 
                to conflict of laws provisions. In addition, you 
                agree to submit to the personal jurisdiction and 
                venue of such courts. Any cause of action by you 
                with respect to our Websites/apps or Service must 
                be instituted within one (1) year after the cause of 
                action arose or be forever waived and barred. </Content>
                <Footer />
            <Title>Limited License</Title>
                <Footer />
              <Content>
                Tina Maids Franchise LLC. grants you a nonexclusive, 
                nontransferable, revocable license to access and 
                use our Websites/apps and Services strictly in 
                accordance with this Agreement. Your use of our 
                Websites/apps and Services are solely for internal 
                purposes, unless otherwise provided in this 
                Agreement. No printout or electronic version of 
                any part of our Websites/apps or Services may be 
                used by you in any litigation or arbitration matter 
                whatsoever under any circumstances.</Content>
                <Footer />
            <Title>Legal Compliance</Title>
                <Footer />
              <Content>
                You agree to comply with all applicable domestic 
                and international laws, statutes, ordinances, and 
                regulations regarding your use of our Websites/apps, 
                Content, Services, and any software provided 
                therein.</Content>
                <Footer />
            <Title>Our Relationship to You</Title>
                <Footer />
              <Content>
                This Agreement in no way creates any agency, 
                partnership, joint venture, employee-employer or 
                franchisor-franchisee relationship between you 
                and Tina Maids Franchise LLC.</Content>
                <Footer />
            <Title>Our Intellectual Property</Title>  
                <Footer />
              <Content>
                Our Website may contain our service marks or 
                trademarks as well as those of our affiliates or 
                other companies in the form of words, graphics, 
                and logos. Your use of our Websites/apps or 
                Services does not constitute any right or license for 
                you to use our service marks or trademarks without 
                the prior written permission of Tina Maids 
                Franchise LLC. Our Content, as found within our 
                Websites/apps and Services, is protected under 
                United States and foreign copyrights. Copying, 
                redistribution, use, or publication by you of any 
                such Content is strictly prohibited. Your use of our 
                Websites/apps and Services does not grant you 
                any ownership rights to our Content.</Content>
                <Footer />
            <Title>Eligibility and Registration for Membership</Title>
                <Footer />
              <Content>
                To use our Services you must register with our 
                Websites/apps to become a Member. Your 
                Membership is not transferable or assignable and 
                is void where prohibited. Our Websites/apps and 
                Services are intended solely for Users who are at 
                least (18) years of age or older. Any registration 
                by, use of, or access to our Website by anyone 
                under that age is unauthorized, unlicensed, and 
                in violation of these Terms and Conditions. 
                By using our Websites/apps and/or Services you 
                represent and warrant that you are (18) years of 
                age or older and agree to abide by all the terms 
                and conditions of this Agreement. 
                Tina Maids Franchise LLC. has sole right and 
                discretion to determine whether to accept a 
                Member, and may reject a Member’s registration 
                with or without explanation.
                <Footer />
                When you complete the registration process, you 
                will receive a password that will allow you to access 
                our Services. You agree to maintain the 
                confidentiality of your password and are fully 
                responsible for all liability and damages resulting 
                from your failure to maintain that confidentiality 
                and all activities that occur through the use of 
                your password. You agree to immediately notify 
                us of any unauthorized use of your password or 
                any other breach of security. You agree that our 
                Websites/apps cannot and will not be liable for 
                any loss or damage arising from your failure to 
                comply with password security as discussed herein.</Content>
                <Footer />
            <Title>Use of Information</Title>
                <Footer />
              <Content>
                You grant Tina Maids Franchise LLC. a license to 
                use the information and materials you post to our 
                Websites/apps. By posting, displaying, 
                transmitting, performing, or otherwise distributing 
                information or other content (“Member Content”) 
                to our Website, you are granting 
                Tina Maids Franchise LLC., its officers, directors, 
                employees, agents, consultants, representatives 
                and affiliates, a license to use the Member 
                Content in connection with the operation of the 
                business of Tina Maids Franchise LLC., its directors, 
                employees, officers, affiliates, representatives, 
                consultants, and agents, including without 
                limitation, a right to distribute, copy, transmit, 
                publicly display, reproduce, translate, edit, and 
                reformat Member Content. You understand and 
                agree that you will not be compensated for any 
                Member Content. By posting Member Content on 
                our Websites/apps or Service, you warrant and 
                represent that you own the rights to the Member 
                Content or are authorized to post, display, 
                distribute, perform, or transmit Member Content.</Content>
                <Footer />
            <Title>Unlawful Activity</Title>
                <Footer />
              <Content>
                We reserve the right to investigate complaints or 
                reported violations of this Agreement and take 
                any action we deem appropriate, including but 
                not limited to reporting any suspected unlawful 
                activity to law enforcement officials, regulators, 
                or other third parties and disclosing any information 
                necessary or appropriate to such persons or 
                entities relating to your profile, email addresses, 
                usage history, posted materials, IP addresses, 
                and traffic information.</Content>
                <Footer />
            <Title>Linking to Our Websites/apps</Title>
                <Footer />
              <Content>
                You may provide links to our Websites/apps 
                provided that (a) you do not remove or obscure 
                any portion of our Website by framing or otherwise, 
                (b) your website does not engage in illegal or 
                pornographic activities, and (c) you discontinue 
                providing links to our Website immediately 
                upon our request.</Content>
                <Footer />
            <Title>Payments</Title>
                <Footer />
              <Content>
                You represent and warrant that if you are 
                purchasing something from us, (i) any credit 
                information you supply is true and complete, (ii) 
                charges incurred by you will be honored by your 
                bank or credit card company, (iii) you will pay 
                the charges incurred by you at the posted prices, 
                including any applicable taxes, and (iv) if your 
                initial payment method is dishonored, you will 
                still pay the incurred charges, including any 
                surcharge we may incur due to the dishonored 
                payment.</Content>
                <Footer />
            <Title>Termination of Membership</Title>
                <Footer />
              <Content>
                Your membership with us is effective until 
                terminated by you or us. Your rights under these 
                Terms and Conditions will terminate without our 
                notice if you fail to comply with any term of these 
                Terms and Conditions. On termination you will 
                stop representing yourself as a registered Member 
                or Contractor. You must delete or destroy any 
                information or content (including all copies) 
                obtained from our Websites/apps. Certain 
                provisions of this Agreement, including but not 
                limited to copyrights, indemnity, trademarks, 
                limitation of liability, warranty and jurisdictional 
                issues will survive the termination of this Agreement.</Content>
                <Footer />
            <Title>Indemnification</Title> 
                <Footer />
              <Content>
                You agree to indemnify, defend, and hold us and 
                our partners, agents, officers, directors, 
                employees, subcontractors, successors, assigns, 
                third party suppliers of information and documents, 
                attorneys, advertisers, product and service 
                providers, and affiliates free from any liability, 
                loss, claim, and expense, including reasonable 
                attorney’s fees, related to your violation of this 
                Agreement or use of our Websites/apps or Services. </Content>
                <Footer />
            <Title>Severability and Survival</Title>
                <Footer />
              <Content>
                Should any part of this Agreement be held 
                invalid or unenforceable, that portion will be 
                construed consistent with applicable law and 
                the remaining portions will remain in full force 
                and effect. To the extent that any Content is in 
                conflict or inconsistent with this Agreement, this 
                Agreement will take precedence. Our failure to 
                enforce any provision of this Agreement will not 
                be deemed a waiver of such provision, nor of 
                the right to enforce such provision. Our rights under 
                this Agreement will survive any termination 
                of this Agreement.</Content>
                <Footer />
            <Title>Changes to Our Terms and Conditions</Title>
                <Footer />
              <Content>
                We reserve the right to change these Terms 
                and Conditions at any time by giving you 
                advanced notice of the changes by email or in 
                writing. We will also post these changes on our 
                website. These changes will become effective 
                30 days after receiving the notice. To avoid doubt, 
                no unilateral amendment will retroactively change 
                agreed dispute-resolution provisions of these 
                Terms and Conditions, if any, including, for example, 
                arbitration provisions for then-pending disputes 
                unless the parties expressly agree otherwise. 
                Your continued use of our Website, Services, and 
                Products after any change to these Terms and 
                Conditions and notifying you will constitute your 
                acceptance of such change. If you do not agree 
                with the changes to these Terms and Conditions, 
                you can choose to discontinue the use of our 
                Websites/apps, Services, and Products.</Content>
            <Footer />
          </ContentContainer> 
        </Container>
    </ScrollView>
  );
};
export default TermsView;

const Container = styled(View)`
  flex: 1;
`;
const ContentContainer = styled(View)`
 padding-horizontal: 20px;
`
const Title = styled(Text)`
  font-size: 20px;
  font-weight: 500;
`
const Content = styled(Text)`
  font-size: 18px;
`

const Footer = styled(View)`
 height: 20px;
`
