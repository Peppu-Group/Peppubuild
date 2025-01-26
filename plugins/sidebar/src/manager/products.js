import UI from '../utils/ui';

export default class ProductApp extends UI {
    constructor(editor, opts = {}) {
        super(editor, opts);
        this.state = {}
    }

    onRender() {}

    render() {
        const { $, editor } = this;

        // Do stuff on render
        this.onRender();
        this.$el?.remove();

        const product = $(`
        <div class="formbold-main-wrapper">
    <!-- Author: FormBold Team -->
    <!-- Learn More: https://formbold.com -->
    <div class="formbold-form-wrapper">
        <form>
            <div class="formbold-mb-5">
                <label for="name" class="formbold-form-label">
                    Product Name
                </label>
                <input type="text" name="name" id="name" placeholder="Enter your product's name"
                    class="formbold-form-input" />
            </div>

            <div class="formbold-mb-5">
                <label for="description" class="formbold-form-label">
                    Product Description
                </label>
                <input type="text" name="description" id="description" placeholder="Enter your product's description"
                    class="formbold-form-input" />
            </div>

            <div class="formbold-mb-5">
                <label for="category" class="formbold-form-label">
                    Product Category
                </label>
                <input type="text" name="category" id="category" placeholder="Enter your product's category"
                    class="formbold-form-input" />
            </div>

            <div class="mb-6 pt-4">
                <label class="formbold-form-label formbold-form-label-2">
                    Upload Product Image
                </label>

                <div class="formbold-mb-5 formbold-file-input">
                    <input type="file" name="file" id="file" />
                    <label for="file">
                        <div>
                            <span class="formbold-drop-file"> Drop files here </span>
                            <span class="formbold-or"> Or </span>
                            <span class="formbold-browse"> Browse </span>
                        </div>
                    </label>
                </div>
            </div>
            <div>
                <button class="formbold-btn w-full">Add Product</button>
            </div>
        </form>
    </div>
</div>
        `);
        this.$el = product;
        return product;
    }
}