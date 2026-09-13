import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import "../styles/legal-page.css";

const PrivacyPolicyPage = () => {
    const navigate = useNavigate();

    return (
        <div className="legal-page-wrapper">
            <article className="legal-page">
                <button
                    className="legal-close-button"
                    onClick={() => navigate("/login")}
                    aria-label="閉じる"
                >
                    <X />
                </button>

                <h1>プライバシーポリシー</h1>

                <p>
                    MyDiary（以下，「本サービス」といいます．）は，
                    本サービスにおけるユーザー情報の取り扱いについて，
                    以下のとおりプライバシーポリシーを定めます．
                </p>

                <section>
                    <h2>1．取得する情報</h2>

                    <p>
                        本サービスでは，以下の情報を取得する場合があります．
                    </p>

                    <ul>
                        <li>メールアドレス</li>
                        <li>ユーザーID</li>
                        <li>日記のタイトルおよび本文</li>
                        <li>ToDoとして登録された内容</li>
                        <li>本サービスの利用に必要な認証情報</li>
                    </ul>
                </section>

                <section>
                    <h2>2．情報の利用目的</h2>

                    <p>
                        取得した情報は，以下の目的で利用します．
                    </p>

                    <ul>
                        <li>ユーザー認証およびアカウント管理のため</li>
                        <li>日記およびToDo機能を提供するため</li>
                        <li>本サービスの維持，改善および不具合対応のため</li>
                        <li>不正利用やセキュリティ上の問題を防止するため</li>
                    </ul>
                </section>

                <section>
                    <h2>3．外部サービスの利用</h2>

                    <p>
                        本サービスでは，サービス提供およびセキュリティ確保のため，
                        以下の外部サービスを利用しています．
                    </p>

                    <ul>
                        <li>Supabase：ユーザー認証およびデータ保存</li>
                        <li>Cloudflare Turnstile：不正アクセスおよびBot対策</li>
                    </ul>

                    <p>
                        各サービスにおける情報の取り扱いについては，
                        各サービス提供者のプライバシーポリシーが適用される場合があります．
                    </p>
                </section>

                <section>
                    <h2>4．第三者への提供</h2>

                    <p>
                        本サービスは，法令に基づく場合を除き，
                        ユーザーの同意なく個人情報を第三者へ提供しません．
                    </p>
                </section>

                <section>
                    <h2>5．データの管理</h2>

                    <p>
                        本サービスでは，ユーザーごとにデータを管理し，
                        他のユーザーが当該データへ不正にアクセスできないよう，
                        適切なアクセス制御を行います．
                    </p>
                </section>

                <section>
                    <h2>6．データおよびアカウントの削除</h2>

                    <p>
                        ユーザーは，本サービスのアカウント設定画面から，
                        日記およびToDoのデータを削除できます．
                    </p>

                    <p>
                        また，アカウントを削除することで，
                        当該アカウントに関連する日記およびToDoを含むデータを
                        削除することができます．
                    </p>
                </section>

                <section>
                    <h2>7．プライバシーポリシーの変更</h2>

                    <p>
                        本サービスは，必要に応じて本ポリシーを変更することがあります．
                        重要な変更がある場合には，本サービス上で適切な方法により
                        お知らせします．
                    </p>
                </section>

                <section>
                    <h2>8．お問い合わせ</h2>

                    <p>
                        本ポリシーに関するお問い合わせは，
                        以下の連絡先までお願いいたします．
                    </p>

                    <p>
                        連絡先：[メールアドレスを記載]
                    </p>
                </section>

                <p className="legal-updated">
                    制定日：2026年9月13日
                </p>
            </article>
        </div>

    );
};

export default PrivacyPolicyPage;